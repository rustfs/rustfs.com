#!/usr/bin/env bash

set -euo pipefail

: "${GITHUB_TOKEN:?GITHUB_TOKEN is required}"
: "${GITHUB_ENV:?GITHUB_ENV is required}"

cache_file="public/homepage-metrics.json"
cache_url="https://rustfs.com/homepage-metrics.json?run=${GITHUB_RUN_ID:-local}"
remote_cache_file="$(mktemp)"
working_cache_file="$(mktemp)"
next_cache_file="$(mktemp)"
trap 'rm -f "${remote_cache_file}" "${working_cache_file}" "${next_cache_file}"' EXIT

validate_cache() {
  jq -e '
    .schemaVersion == 1 and
    (.github.stars | type == "number" and . > 0) and
    (.github.forks | type == "number" and . > 0) and
    (.github.commits | type == "number" and . > 0) and
    (.github.updatedAt | type == "string" and length > 0) and
    (.docker.pulls | type == "number" and . > 0) and
    (.docker.updatedAt | type == "string" and length > 0)
  ' "$1" >/dev/null 2>&1
}

if ! validate_cache "${cache_file}"; then
  echo "Committed homepage metrics cache is invalid" >&2
  exit 1
fi

cp "${cache_file}" "${working_cache_file}"
base_source="seed"

if curl --fail --silent --show-error \
  --connect-timeout 5 --max-time 15 \
  -H "Cache-Control: no-cache" \
  -o "${remote_cache_file}" \
  "${cache_url}" && validate_cache "${remote_cache_file}"; then
  cp "${remote_cache_file}" "${working_cache_file}"
  base_source="cache"
  echo "Restored the last deployed homepage metrics cache"
else
  echo "::warning::The deployed homepage metrics cache is unavailable; using the committed seed"
fi

github_source="${base_source}"
if github_metrics="$({
  curl --fail --silent --show-error \
    --retry 3 --retry-all-errors --connect-timeout 10 --max-time 30 \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    -H "User-Agent: RustFS-Website" \
    --data-binary '{"query":"query { repository(owner: \"rustfs\", name: \"rustfs\") { stargazerCount forkCount defaultBranchRef { target { ... on Commit { history { totalCount } } } } } }"}' \
    https://api.github.com/graphql
})" &&
  stars="$(jq -er '.data.repository.stargazerCount | if type == "number" and . > 0 then . else error("invalid stars") end' <<<"${github_metrics}")" &&
  forks="$(jq -er '.data.repository.forkCount | if type == "number" and . > 0 then . else error("invalid forks") end' <<<"${github_metrics}")" &&
  commits="$(jq -er '.data.repository.defaultBranchRef.target.history.totalCount | if type == "number" and . > 0 then . else error("invalid commits") end' <<<"${github_metrics}")"; then
  refreshed_at="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
  jq \
    --argjson stars "${stars}" \
    --argjson forks "${forks}" \
    --argjson commits "${commits}" \
    --arg refreshed_at "${refreshed_at}" \
    '.github = {stars: $stars, forks: $forks, commits: $commits, updatedAt: $refreshed_at}' \
    "${working_cache_file}" >"${next_cache_file}"
  mv "${next_cache_file}" "${working_cache_file}"
  next_cache_file="$(mktemp)"
  github_source="live"
else
  echo "::warning::GitHub metrics refresh failed; keeping the last successful GitHub values"
fi

docker_source="${base_source}"
if docker_metrics="$({
  curl --fail --silent --show-error \
    --retry 3 --retry-all-errors --connect-timeout 10 --max-time 30 \
    'https://hub.docker.com/v2/namespaces/rustfs/repositories?page_size=100&name=rustfs'
})" &&
  docker_pulls="$(jq -er '.results[] | select(.name == "rustfs") | .pull_count | if type == "number" and . > 0 then . else error("invalid Docker pulls") end' <<<"${docker_metrics}")"; then
  refreshed_at="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
  jq \
    --argjson pulls "${docker_pulls}" \
    --arg refreshed_at "${refreshed_at}" \
    '.docker = {pulls: $pulls, updatedAt: $refreshed_at}' \
    "${working_cache_file}" >"${next_cache_file}"
  mv "${next_cache_file}" "${working_cache_file}"
  next_cache_file="$(mktemp)"
  docker_source="live"
else
  echo "::warning::Docker Hub metrics refresh failed; keeping the last successful Docker values"
fi

if ! validate_cache "${working_cache_file}"; then
  echo "Refreshed homepage metrics cache is invalid" >&2
  exit 1
fi

jq '.' "${working_cache_file}" >"${next_cache_file}"
mv "${next_cache_file}" "${cache_file}"

stars="$(jq -er '.github.stars' "${cache_file}")"
forks="$(jq -er '.github.forks' "${cache_file}")"
commits="$(jq -er '.github.commits' "${cache_file}")"
docker_pulls="$(jq -er '.docker.pulls' "${cache_file}")"

{
  echo "HOMEPAGE_GITHUB_STARS=${stars}"
  echo "HOMEPAGE_GITHUB_FORKS=${forks}"
  echo "HOMEPAGE_GITHUB_COMMITS=${commits}"
  echo "HOMEPAGE_DOCKER_PULLS=${docker_pulls}"
} >>"${GITHUB_ENV}"

echo "Homepage metrics ready (GitHub: ${github_source}; Docker Hub: ${docker_source})"
