#!/usr/bin/env bash

set -euo pipefail

: "${GITHUB_TOKEN:?GITHUB_TOKEN is required}"
: "${GITHUB_ENV:?GITHUB_ENV is required}"

github_metrics="$({
  curl --fail --silent --show-error \
    --retry 3 --retry-all-errors --connect-timeout 10 --max-time 30 \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    -H "User-Agent: RustFS-Website" \
    --data-binary '{"query":"query { repository(owner: \"rustfs\", name: \"rustfs\") { stargazerCount forkCount defaultBranchRef { target { ... on Commit { history { totalCount } } } } } }"}' \
    https://api.github.com/graphql
})"

docker_metrics="$({
  curl --fail --silent --show-error \
    --retry 3 --retry-all-errors --connect-timeout 10 --max-time 30 \
    'https://hub.docker.com/v2/namespaces/rustfs/repositories?page_size=100&name=rustfs'
})"

stars="$(jq -er '.data.repository.stargazerCount | if type == "number" and . > 0 then . else error("invalid stars") end' <<<"${github_metrics}")"
forks="$(jq -er '.data.repository.forkCount | if type == "number" and . > 0 then . else error("invalid forks") end' <<<"${github_metrics}")"
commits="$(jq -er '.data.repository.defaultBranchRef.target.history.totalCount | if type == "number" and . > 0 then . else error("invalid commits") end' <<<"${github_metrics}")"
docker_pulls="$(jq -er '.results[] | select(.name == "rustfs") | .pull_count | if type == "number" and . > 0 then . else error("invalid Docker pulls") end' <<<"${docker_metrics}")"

{
  echo "HOMEPAGE_GITHUB_STARS=${stars}"
  echo "HOMEPAGE_GITHUB_FORKS=${forks}"
  echo "HOMEPAGE_GITHUB_COMMITS=${commits}"
  echo "HOMEPAGE_DOCKER_PULLS=${docker_pulls}"
} >>"${GITHUB_ENV}"
