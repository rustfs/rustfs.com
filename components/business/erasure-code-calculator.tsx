'use client'

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRightIcon,
  CheckIcon,
  DatabaseIcon,
  DownloadIcon,
  HardDriveIcon,
  LinkIcon,
  LifeBuoyIcon,
  ServerIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const formatIntegerInput = (raw: string): string => {
  if (raw === "") return "";
  const n = Number(raw);
  if (!Number.isFinite(n)) return "";
  return String(Math.floor(n));
};

export default function ErasureCodeCalculator() {
  const [servers, setServers] = useState(8);
  const [serversInput, setServersInput] = useState<string | null>(null);
  const [drivesPerServer, setDrivesPerServer] = useState(16);
  const [drivesPerServerInput, setDrivesPerServerInput] = useState<string | null>(null);
  const [driveCapacity, setDriveCapacity] = useState(8);
  const [driveCapacityInput, setDriveCapacityInput] = useState<string | null>(null);
  const [stripeSize, setStripeSize] = useState(16);
  const [parity, setParity] = useState(4);
  const [shareCopied, setShareCopied] = useState(false);
  const [exportBusy, setExportBusy] = useState(false);
  const [appliedFeedback, setAppliedFeedback] = useState(false);

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
    const stripeSizesSource =
      stripeInfo.stripeSizes.length > 0
        ? stripeInfo
        : (() => {
            const serversCorrected = Math.max(4, servers);
            const drivesCorrected = Math.min(256, Math.max(1, drivesPerServer));
            return calculateStripeSizes(serversCorrected, drivesCorrected);
          })();

    if (stripeSizesSource.stripeSizes.length === 0) {
      return null;
    }

    const recommendedStripe = Math.max(...stripeSizesSource.stripeSizes);
    const recommendedParityOptions = calculateParityOptions(recommendedStripe);
    const recommendedParity =
      recommendedParityOptions.includes(4)
        ? 4
        : recommendedParityOptions[0] ?? 0;

    if (stripeInfo.stripeSizes.length > 0) {
      return { stripe: recommendedStripe, parity: recommendedParity };
    }

    const serversCorrected = Math.max(4, servers);
    const drivesCorrected = Math.min(256, Math.max(1, drivesPerServer));
    return {
      stripe: recommendedStripe,
      parity: recommendedParity,
      serversCorrected,
      drivesCorrected,
    };
  }, [stripeInfo, servers, drivesPerServer]);

  useEffect(() => {
    let nextStripeSize: number | null = null;

    if (stripeInfo.stripeSizes.length === 0) {
      nextStripeSize = 0;
    } else if (!stripeInfo.stripeSizes.includes(stripeSize)) {
      nextStripeSize = stripeInfo.stripeSizes[0];
    }

    if (nextStripeSize === null) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setStripeSize(nextStripeSize);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [stripeInfo.stripeSizes, stripeSize]);

  useEffect(() => {
    let nextParity: number | null = null;

    if (parityOptions.length === 0) {
      nextParity = 0;
    } else if (!parityOptions.includes(parity)) {
      nextParity = totalDrives >= 16 && parityOptions.includes(4) ? 4 : parityOptions[0];
    }

    if (nextParity === null) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setParity(nextParity);
    });

    return () => window.cancelAnimationFrame(frame);
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
        const frame = window.requestAnimationFrame(() => {
          setServers(nextServers);
          setDrivesPerServer(nextDrives);
          setDriveCapacity(nextCapacity);
          setStripeSize(nextStripe);
          setParity(nextParity);
        });

        return () => window.cancelAnimationFrame(frame);
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

  const usablePercent =
    validationError || results.efficiency <= 0
      ? 0
      : Math.min(100, Math.max(0, Math.round(results.efficiency * 100)));
  const parityPercent = usablePercent > 0 ? 100 - usablePercent : 0;

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
    <div className="relative z-10 border-y border-border py-16 text-foreground sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl border-t border-border pt-8">
          <div className="mb-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-1 w-24 bg-brand" />
            <span>Erasure coding planner</span>
          </div>
          <h1 className="max-w-4xl font-display text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
            Size a RustFS erasure set before you deploy.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">
            Model raw capacity, usable capacity, stripe layout, and failure tolerance from the
            hardware shape you plan to run.
          </p>
        </div>

        <div className="mt-12 grid border-y border-border sm:grid-cols-3">
          <div className="border-b border-border py-6 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0">
            <ServerIcon className="size-5 text-brand" />
            <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Servers
            </div>
            <div className="mt-2 font-mono text-3xl font-semibold text-foreground">{servers}</div>
          </div>
          <div className="border-b border-border py-6 sm:border-b-0 sm:border-r sm:px-5">
            <HardDriveIcon className="size-5 text-brand" />
            <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Total drives
            </div>
            <div className="mt-2 font-mono text-3xl font-semibold text-foreground">{totalDrives}</div>
          </div>
          <div className="py-6 sm:pl-5">
            <DatabaseIcon className="size-5 text-brand" />
            <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Raw capacity
            </div>
            <div className="mt-2 font-mono text-3xl font-semibold text-foreground">
              {validationError ? "--" : niceBytes(results.rawBytes)}
            </div>
          </div>
        </div>

        <div className="mt-10 grid items-start gap-12 lg:grid-cols-[minmax(0,0.6fr)_0.4fr]">
          <section className="flex flex-col border-t border-border">
            <div className="border-b border-border py-6">
              <h2 className="text-lg font-semibold text-foreground">Cluster input</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Hardware first, then choose the erasure layout.
              </p>
            </div>

            {validationError ? (
              <div className="border-b border-destructive/40 bg-destructive/10 px-5 py-4 text-sm text-destructive">
                {validationError}
              </div>
            ) : null}

            <div className="grid gap-5 border-b border-border py-6 md:grid-cols-3">
              <label className="block">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Servers
                </span>
                <Input
                  type="number"
                  min={1}
                  value={serversInput !== null ? serversInput : servers}
                  onFocus={() => setServersInput(String(servers))}
                  onChange={(event) => {
                    const formatted = formatIntegerInput(event.target.value);
                    setServersInput(formatted);
                    if (formatted !== "") setServers(Number(formatted));
                  }}
                  onBlur={() => {
                    if (serversInput === "" || Number(serversInput) < 1) setServers(1);
                    setServersInput(null);
                  }}
                  className="mt-3 h-11 bg-background font-mono text-base"
                />
              </label>

              <label className="block">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Drives / server
                </span>
                <Input
                  type="number"
                  min={1}
                  max={256}
                  value={drivesPerServerInput !== null ? drivesPerServerInput : drivesPerServer}
                  onFocus={() => setDrivesPerServerInput(String(drivesPerServer))}
                  onChange={(event) => {
                    const formatted = formatIntegerInput(event.target.value);
                    setDrivesPerServerInput(formatted);
                    if (formatted !== "") setDrivesPerServer(Number(formatted));
                  }}
                  onBlur={() => {
                    if (drivesPerServerInput === "" || Number(drivesPerServerInput) < 1) {
                      setDrivesPerServer(1);
                    } else if (Number(drivesPerServerInput) > 256) {
                      setDrivesPerServer(256);
                    }
                    setDrivesPerServerInput(null);
                  }}
                  className="mt-3 h-11 bg-background font-mono text-base"
                />
              </label>

              <label className="block">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Drive TiB
                </span>
                <Input
                  type="number"
                  min={1}
                  value={driveCapacityInput !== null ? driveCapacityInput : driveCapacity}
                  onFocus={() => setDriveCapacityInput(String(driveCapacity))}
                  onChange={(event) => {
                    const formatted = formatIntegerInput(event.target.value);
                    setDriveCapacityInput(formatted);
                    if (formatted !== "") setDriveCapacity(Number(formatted));
                  }}
                  onBlur={() => {
                    if (driveCapacityInput === "" || Number(driveCapacityInput) < 1) {
                      setDriveCapacity(1);
                    }
                    setDriveCapacityInput(null);
                  }}
                  className="mt-3 h-11 bg-background font-mono text-base"
                />
              </label>
            </div>

            <div className="grid gap-5 border-b border-border py-6 md:grid-cols-2">
              <label className="block">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Stripe size (K + M)
                </span>
                <Select
                  value={stripeSize ? String(stripeSize) : undefined}
                  onValueChange={(value) => setStripeSize(Number(value))}
                  disabled={stripeInfo.stripeSizes.length === 0}
                >
                  <SelectTrigger className="mt-3 h-11 w-full bg-background font-mono text-base">
                    <SelectValue placeholder="Unavailable" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {stripeInfo.stripeSizes.map((value) => (
                        <SelectItem key={value} value={String(value)}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <p className="mt-3 text-xs leading-5 text-muted-foreground">
                  Drives per erasure set. Larger stripes improve efficiency when the hardware
                  shape allows it.
                </p>
              </label>

              <label className="block">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Parity (M)
                </span>
                <Select
                  value={parity ? String(parity) : undefined}
                  onValueChange={(value) => setParity(Number(value))}
                  disabled={parityOptions.length === 0}
                >
                  <SelectTrigger className="mt-3 h-11 w-full bg-background font-mono text-base">
                    <SelectValue placeholder="Unavailable" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {parityOptions.map((value) => (
                        <SelectItem key={value} value={String(value)}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <p className="mt-3 text-xs leading-5 text-muted-foreground">
                  Higher parity increases fault tolerance and reduces usable capacity.
                </p>
              </label>
            </div>

            <div className="grid gap-5 border-b border-border py-5 sm:grid-cols-3">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Data shards
                </div>
                <div className="mt-2 font-mono text-xl font-semibold text-foreground">
                  {validationError ? "--" : stripeSize - parity}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Parity shards
                </div>
                <div className="mt-2 font-mono text-xl font-semibold text-foreground">
                  {validationError ? "--" : parity}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Erasure set
                </div>
                <div className="mt-2 font-mono text-xl font-semibold text-foreground">
                  {validationError ? "--" : `${stripeSize} drives`}
                </div>
              </div>
            </div>

            {recommendedConfig ? (
              <div className="flex flex-1 border-b border-border py-6 text-sm">
                <div className="grid w-full gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
                  <div>
                    <div className="font-medium text-foreground">Recommended layout</div>
                    <div className="mt-1 leading-6 text-muted-foreground">
                      {recommendedConfig.serversCorrected != null ? (
                        <>
                          Use at least 4 servers, {recommendedConfig.drivesCorrected} drives per
                          server, stripe {recommendedConfig.stripe}, parity{" "}
                          {recommendedConfig.parity}.
                        </>
                      ) : (
                        <>
                          Stripe {recommendedConfig.stripe}, parity {recommendedConfig.parity}.
                          Balanced for availability and efficiency.
                        </>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        recommendedConfig.serversCorrected != null &&
                        recommendedConfig.drivesCorrected != null
                      ) {
                        setServers(recommendedConfig.serversCorrected);
                        setDrivesPerServer(recommendedConfig.drivesCorrected);
                        setServersInput(null);
                        setDrivesPerServerInput(null);
                        queueMicrotask(() => {
                          setStripeSize(recommendedConfig.stripe);
                          setParity(recommendedConfig.parity);
                        });
                      } else {
                        setStripeSize(recommendedConfig.stripe);
                        setParity(recommendedConfig.parity);
                      }
                      setAppliedFeedback(true);
                      setTimeout(() => setAppliedFeedback(false), 1500);
                    }}
                  >
                    {appliedFeedback ? <CheckIcon className="size-4" /> : <ShieldCheckIcon className="size-4" />}
                    {appliedFeedback ? "Applied" : "Apply"}
                  </Button>
                </div>
              </div>
            ) : null}

            <div className="mt-auto grid gap-8 border-b border-border py-6 md:grid-cols-[1fr_0.92fr]">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Production check
                </div>
                <div className="mt-4 grid gap-3 text-sm">
                  <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-border pb-3">
                    <span className="text-muted-foreground">Failure domain</span>
                    <span className="font-medium text-foreground">rack / node</span>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-border pb-3">
                    <span className="text-muted-foreground">Rebuild headroom</span>
                    <span className="font-medium text-foreground">capacity + I/O</span>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] gap-4">
                    <span className="text-muted-foreground">Ops baseline</span>
                    <span className="font-medium text-foreground">alerts + spares</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col border-l border-border pl-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <LifeBuoyIcon className="size-4 text-brand" />
                  Need a sizing review?
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Share your node count, drive model, expected growth, and failure-domain target
                  with the RustFS team before ordering hardware.
                </p>
                <Button asChild variant="outline" size="sm" className="mt-auto w-fit">
                  <a href="/contact-us">
                    Contact us
                    <ArrowUpRightIcon className="size-4" />
                  </a>
                </Button>
              </div>
            </div>
          </section>

          <section className="border-t border-border">
            <div className="border-b border-border py-6">
              <h2 className="text-lg font-semibold text-foreground">Capacity output</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Usable data after parity reservation.
              </p>
            </div>

            <div className="py-6">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Usable capacity
              </div>
              <div className="mt-3 font-mono text-5xl font-semibold tracking-tight text-foreground">
                {validationError ? "--" : niceBytes(results.usableBytes)}
              </div>

              <div className="mt-8 border border-border bg-background">
                <div className="grid grid-cols-[1fr_auto] border-b border-border text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <span className="px-3 py-2">Capacity split</span>
                  <span className="border-l border-border px-3 py-2">
                    {validationError ? "--" : `${usablePercent}% usable`}
                  </span>
                </div>
                <div className="flex h-4 bg-muted">
                  <div
                    className="bg-brand"
                    style={{ width: `${usablePercent}%` }}
                    aria-hidden="true"
                  />
                  <div
                    className="bg-foreground/20"
                    style={{ width: `${parityPercent}%` }}
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-6 border-y border-border py-5 sm:grid-cols-2">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Raw
                  </div>
                  <div className="mt-2 font-mono text-xl font-semibold text-foreground">
                    {validationError ? "--" : niceBytes(results.rawBytes)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Efficiency
                  </div>
                  <div className="mt-2 font-mono text-xl font-semibold text-foreground">
                    {validationError ? "--" : `${Math.floor(results.efficiency * 100)}%`}
                  </div>
                </div>
              </div>

              <div className="mt-6 divide-y divide-border border-y border-border">
                <div className="py-5">
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <HardDriveIcon className="size-4 text-brand" />
                    Drive failure tolerance
                  </div>
                  <div className="mt-2 text-sm leading-6 text-muted-foreground">
                    {validationError
                      ? "--"
                      : `${results.driveFailuresTotal} drives across cluster`}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {validationError
                      ? ""
                      : `${results.driveFailures} out of ${stripeSize} drives per stripe`}
                  </div>
                </div>

                <div className="py-5">
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <ServerIcon className="size-4 text-brand" />
                    Server failure tolerance
                  </div>
                  <div className="mt-2 text-sm leading-6 text-muted-foreground">
                    {validationError
                      ? "--"
                      : `${results.serverFailuresTotal} servers across cluster`}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {validationError
                      ? ""
                      : `${results.serverFailuresPerShard} out of ${stripeInfo.numServersPerShard} servers per shard`}
                  </div>
                </div>
              </div>

              <p className="mt-5 text-xs leading-6 text-muted-foreground">
                Results are rounded down to quorum-safe limits and should be treated as planning
                estimates before production sizing.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleExportCsv}
                  disabled={!!validationError}
                  className="min-w-28"
                >
                  <DownloadIcon className="size-4" />
                  CSV
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleExportSvg}
                  disabled={!!validationError || exportBusy}
                  className="min-w-28"
                >
                  <DownloadIcon className="size-4" />
                  {exportBusy ? "Exporting" : "SVG"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCopyShareLink}
                  className="min-w-32"
                >
                  {shareCopied ? (
                    <CheckIcon className="size-4" />
                  ) : (
                    <LinkIcon className="size-4" />
                  )}
                  {shareCopied ? "Copied" : "Copy link"}
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
