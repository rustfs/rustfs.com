'use client'

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const units = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

const niceBytes = (value: number) => {
  if (!Number.isFinite(value) || value <= 0) {
    return `0 ${units[4]}`;
  }

  let unitIndex = 0;
  let number = value;

  while (number >= 1024 && unitIndex < units.length - 1) {
    number /= 1024;
    unitIndex += 1;
  }

  const precision = number < 10 && unitIndex > 0 ? 1 : 0;
  return `${number.toFixed(precision)} ${units[unitIndex]}`;
};

const getBytes = (value: number, unit: string) => {
  const index = units.findIndex((item) => item === unit);
  if (index === -1) {
    return 0;
  }
  return value * Math.pow(1024, index);
};

const calculateStripeSizes = (servers: number, drivesPerServer: number) => {
  let numServersPerShard = servers;
  let numShards = 1;

  for (let index = 1; index <= 16; index += 1) {
    if (servers % index === 0) {
      numServersPerShard = index;
      numShards = servers / index;
    }
  }

  if (numServersPerShard <= 3) {
    return {
      stripeSizes: [] as number[],
      numServersPerShard,
      numShards,
      error: "Minimum 4 servers are recommended for high availability.",
    };
  }

  let stripeSizes: number[] = [];

  if (numShards === 1) {
    let multiplier = 1;
    let stripeSize = numServersPerShard * multiplier;

    while (stripeSize <= 16) {
      if ((numServersPerShard * drivesPerServer) % stripeSize === 0) {
        stripeSizes.push(stripeSize);
      }
      multiplier += 1;
      stripeSize = numServersPerShard * multiplier;
    }
  } else {
    stripeSizes = [numServersPerShard];
  }

  if (stripeSizes.length > 1) {
    stripeSizes = stripeSizes.sort((a, b) => b - a);
  }

  return {
    stripeSizes,
    numServersPerShard,
    numShards,
    error: null as string | null,
  };
};

const calculateParityOptions = (stripeSize: number) => {
  const options: number[] = [];
  let size = stripeSize;

  while (size >= 4) {
    if (size % 2 === 0) {
      options.push(size / 2);
    }
    size -= 1;
  }

  return options;
};

export default function ErasureCodeCalculator() {
  const [servers, setServers] = useState(8);
  const [drivesPerServer, setDrivesPerServer] = useState(16);
  const [driveCapacity, setDriveCapacity] = useState(8);
  const [stripeSize, setStripeSize] = useState(0);
  const [parity, setParity] = useState(0);
  const [shareCopied, setShareCopied] = useState(false);
  const [exportBusy, setExportBusy] = useState(false);

  const totalDrives = servers * drivesPerServer;

  const stripeInfo = useMemo(() => {
    if (!Number.isFinite(drivesPerServer) || drivesPerServer < 1 || drivesPerServer > 256) {
      return {
        stripeSizes: [] as number[],
        numServersPerShard: 0,
        numShards: 0,
        error: "Number of drives per server must be between 1 and 256.",
      };
    }

    if (!Number.isFinite(driveCapacity) || driveCapacity < 1) {
      return {
        stripeSizes: [] as number[],
        numServersPerShard: 0,
        numShards: 0,
        error: "Drive capacity must be at least 1 TiB.",
      };
    }

    return calculateStripeSizes(servers, drivesPerServer);
  }, [servers, drivesPerServer, driveCapacity]);

  const parityOptions = useMemo(() => {
    if (stripeInfo.error || stripeSize <= 0) {
      return [] as number[];
    }

    if (totalDrives < 4) {
      return [] as number[];
    }

    return calculateParityOptions(stripeSize);
  }, [stripeInfo.error, stripeSize, totalDrives]);

  const validationError = useMemo(() => {
    if (stripeInfo.error) {
      return stripeInfo.error;
    }

    if (totalDrives < 4) {
      return "Specify a configuration with 4 or more total drives.";
    }

    if (stripeSize > 0 && parityOptions.length === 0) {
      return "Invalid configuration set. Please try another combination.";
    }

    return null as string | null;
  }, [stripeInfo.error, totalDrives, stripeSize, parityOptions.length]);

  const recommendedConfig = useMemo(() => {
    if (stripeInfo.stripeSizes.length === 0) {
      return null;
    }

    const recommendedStripe = Math.max(...stripeInfo.stripeSizes);
    const recommendedParityOptions = calculateParityOptions(recommendedStripe);
    const recommendedParity =
      recommendedParityOptions.includes(4)
        ? 4
        : recommendedParityOptions[0] ?? 0;

    return {
      stripe: recommendedStripe,
      parity: recommendedParity,
    };
  }, [stripeInfo.stripeSizes]);

  useEffect(() => {
    if (stripeInfo.stripeSizes.length === 0) {
      setStripeSize(0);
      return;
    }

    if (!stripeInfo.stripeSizes.includes(stripeSize)) {
      setStripeSize(stripeInfo.stripeSizes[0]);
    }
  }, [stripeInfo.stripeSizes, stripeSize]);

  useEffect(() => {
    if (parityOptions.length === 0) {
      setParity(0);
      return;
    }

    if (!parityOptions.includes(parity)) {
      const preferred = totalDrives >= 16 && parityOptions.includes(4) ? 4 : parityOptions[0];
      setParity(preferred);
    }
  }, [parityOptions, parity, totalDrives]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (
      params.has("number_of_servers") &&
      params.has("drives_per_server") &&
      params.has("drive_capacity") &&
      params.has("stripe_size") &&
      params.has("parity_count")
    ) {
      const nextServers = Number(params.get("number_of_servers"));
      const nextDrives = Number(params.get("drives_per_server"));
      const nextCapacity = Number(params.get("drive_capacity"));
      const nextStripe = Number(params.get("stripe_size"));
      const nextParity = Number(params.get("parity_count"));

      if (
        Number.isFinite(nextServers) &&
        Number.isFinite(nextDrives) &&
        Number.isFinite(nextCapacity) &&
        Number.isFinite(nextStripe) &&
        Number.isFinite(nextParity)
      ) {
        setServers(nextServers);
        setDrivesPerServer(nextDrives);
        setDriveCapacity(nextCapacity);
        setStripeSize(nextStripe);
        setParity(nextParity);
      }
    }
  }, []);

  const results = useMemo(() => {
    if (validationError || stripeSize === 0 || parity === 0) {
      return {
        rawBytes: 0,
        usableBytes: 0,
        efficiency: 0,
        driveFailures: 0,
        driveFailuresTotal: 0,
        serverFailuresPerShard: 0,
        serverFailuresTotal: 0,
      };
    }

    const rawBytes = totalDrives * getBytes(driveCapacity, "TiB");
    const efficiency = (stripeSize - parity) / stripeSize;
    const usableBytes = rawBytes * efficiency;

    let driveFailures = parity;
    if (driveFailures === stripeSize / 2) {
      driveFailures -= 1;
    }

    const driveFailuresTotal = Math.floor((driveFailures / stripeSize) * totalDrives);
    const serverFailuresPerShard = Math.floor(
      (driveFailures * stripeInfo.numServersPerShard) / stripeSize
    );
    const serverFailuresTotal = Math.floor(
      (driveFailures * stripeInfo.numServersPerShard * stripeInfo.numShards) / stripeSize
    );

    return {
      rawBytes,
      usableBytes,
      efficiency,
      driveFailures,
      driveFailuresTotal,
      serverFailuresPerShard,
      serverFailuresTotal,
    };
  }, [
    validationError,
    stripeSize,
    parity,
    totalDrives,
    driveCapacity,
    stripeInfo.numServersPerShard,
    stripeInfo.numShards,
  ]);

  const handleCopyShareLink = async () => {
    setShareCopied(false);
    const params = new URLSearchParams({
      number_of_servers: String(servers),
      drives_per_server: String(drivesPerServer),
      drive_capacity: String(driveCapacity),
      stripe_size: String(stripeSize),
      parity_count: String(parity),
    });
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareCopied(true);
    } catch {
      setShareCopied(false);
    }
  };

  const buildSummary = () => {
    return {
      "Number of servers": servers,
      "Drives per server": drivesPerServer,
      "Drive capacity (TiB)": driveCapacity,
      "Stripe size (K + M)": stripeSize,
      "Parity (M)": parity,
      "Raw capacity": niceBytes(results.rawBytes),
      "Usable capacity": niceBytes(results.usableBytes),
      "Storage efficiency": `${Math.floor(results.efficiency * 100)}%`,
      "Drive failure tolerance": `${results.driveFailuresTotal} drives across cluster`,
      "Drive tolerance per stripe": `${results.driveFailures} out of ${stripeSize}`,
      "Server failure tolerance": `${results.serverFailuresTotal} servers across cluster`,
      "Server tolerance per shard": `${results.serverFailuresPerShard} out of ${stripeInfo.numServersPerShard}`,
    };
  };

  const handleExportCsv = () => {
    if (validationError) {
      return;
    }
    const summary = buildSummary();
    const rows = Object.entries(summary).map(
      ([key, value]) => `${key},${value}`
    );
    const csvContent = ["Metric,Value", ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "rustfs-erasure-code-results.csv";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleExportSvg = () => {
    if (validationError) {
      return;
    }

    setExportBusy(true);
    const summary = buildSummary();
    const entries = Object.entries(summary);
    const lineHeight = 22;
    const padding = 32;
    const width = 720;
    const height = padding * 2 + lineHeight * (entries.length + 2);

    const lines = entries
      .map(([key, value], index) => {
        const y = padding + lineHeight * (index + 2);
        return `<text x="${padding}" y="${y}" fill="#0f172a" font-size="14" font-family="Inter, Arial, sans-serif">${key}: ${value}</text>`;
      })
      .join("");

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="#ffffff" />
  <text x="${padding}" y="${padding}" fill="#0f172a" font-size="20" font-family="Inter, Arial, sans-serif" font-weight="600">RustFS Erasure Code Results</text>
  ${lines}
</svg>`;

    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "rustfs-erasure-code-results.svg";
    link.click();
    window.URL.revokeObjectURL(url);
    setExportBusy(false);
  };

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-semibold text-foreground">
          Erasure Code Calculator
        </h1>
        <p className="mt-4 text-muted-foreground">
          Estimate raw and usable capacity along with failure tolerance for RustFS erasure coding.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-xl border border-border bg-background p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Configuration</h2>
            <Button variant="outline" size="sm" type="button" onClick={handleCopyShareLink}>
              {shareCopied ? "Copied" : "Copy share link"}
            </Button>
          </div>

          {validationError && (
            <div className="mt-4 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {validationError}
            </div>
          )}

          <div className="mt-6 space-y-6">
            <label className="block">
              <span className="text-sm font-medium text-foreground">Number of servers</span>
              <Input
                type="number"
                min={1}
                value={servers}
                onChange={(event) => setServers(Math.abs(Number(event.target.value)))}
                className="mt-2"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">Drives per server</span>
              <Input
                type="number"
                min={1}
                max={256}
                value={drivesPerServer}
                onChange={(event) => setDrivesPerServer(Math.abs(Number(event.target.value)))}
                className="mt-2"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">Drive capacity (TiB)</span>
              <Input
                type="number"
                min={1}
                value={driveCapacity}
                onChange={(event) => setDriveCapacity(Math.abs(Number(event.target.value)))}
                className="mt-2"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">Stripe size (K + M)</span>
              <Select
                value={stripeSize ? String(stripeSize) : ""}
                onChange={(event) => setStripeSize(Number(event.target.value))}
                className="mt-2"
                disabled={stripeInfo.stripeSizes.length === 0}
              >
                {stripeInfo.stripeSizes.length === 0 ? (
                  <option value="">Unavailable</option>
                ) : (
                  stripeInfo.stripeSizes.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))
                )}
              </Select>
              <p className="mt-2 text-xs text-muted-foreground">
                Stripe size is the number of drives in each erasure set (data + parity). Larger
                stripes improve efficiency when capacity allows.
              </p>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground">Parity (M)</span>
              <Select
                value={parity ? String(parity) : ""}
                onChange={(event) => setParity(Number(event.target.value))}
                className="mt-2"
                disabled={parityOptions.length === 0}
              >
                {parityOptions.length === 0 ? (
                  <option value="">Unavailable</option>
                ) : (
                  parityOptions.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))
                )}
              </Select>
              <p className="mt-2 text-xs text-muted-foreground">
                Parity controls resiliency. Higher M increases fault tolerance but reduces usable
                capacity.
              </p>
            </label>
          </div>

          {recommendedConfig && (
            <div className="mt-8 rounded-lg border border-border bg-muted/40 px-4 py-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium text-foreground">Recommended configuration</div>
                  <div className="mt-1 text-muted-foreground">
                    Stripe size {recommendedConfig.stripe}, parity {recommendedConfig.parity}.
                    Balanced for efficiency and availability.
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={() => {
                    setStripeSize(recommendedConfig.stripe);
                    setParity(recommendedConfig.parity);
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>
          )}
        </section>

        <section className="rounded-xl border border-border bg-muted/40 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Results</h2>

          <div className="mt-6 space-y-4 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Usable capacity</span>
              <span className="text-base font-semibold text-foreground">
                {validationError ? "--" : niceBytes(results.usableBytes)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Raw capacity</span>
              <span className="text-base font-semibold text-foreground">
                {validationError ? "--" : niceBytes(results.rawBytes)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Storage efficiency</span>
              <span className="text-base font-semibold text-foreground">
                {validationError ? "--" : `${Math.floor(results.efficiency * 100)}%`}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-border bg-background px-4 py-4 text-sm">
            <div className="font-medium text-foreground">Drive failure tolerance</div>
            <div className="mt-2 text-muted-foreground">
              {validationError
                ? "--"
                : `${results.driveFailuresTotal} drives across cluster`}
            </div>
            <div className="text-muted-foreground">
              {validationError
                ? ""
                : `(${results.driveFailures} out of ${stripeSize} drives per stripe)`}
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-border bg-background px-4 py-4 text-sm">
            <div className="font-medium text-foreground">Server failure tolerance</div>
            <div className="mt-2 text-muted-foreground">
              {validationError
                ? "--"
                : `${results.serverFailuresTotal} servers across cluster`}
            </div>
            <div className="text-muted-foreground">
              {validationError
                ? ""
                : `(${results.serverFailuresPerShard} out of ${stripeInfo.numServersPerShard} servers per shard)`}
            </div>
          </div>

          <div className="mt-6 text-xs text-muted-foreground">
            Calculation uses parity and stripe sizing to estimate capacity and tolerances. Results are
            rounded down to match quorum-safe limits.
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button type="button" variant="outline" onClick={handleExportCsv} disabled={!!validationError}>
              Download CSV
            </Button>
            <Button type="button" variant="outline" onClick={handleExportSvg} disabled={!!validationError || exportBusy}>
              {exportBusy ? "Exporting..." : "Download SVG"}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
