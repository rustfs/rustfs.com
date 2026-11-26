export interface PeakSizeRow {
  sizeMiB: number;
  putRdmaGiBps: string;
  putHttpGiBps: string | null;
  getRdmaGiBps: string;
  getHttpGiBps: string | null;
}

export interface ConcurrencyRow {
  sizeMiB: number;
  operation: "PUT" | "GET";
  concurrency: number;
  rdmaGiBps: string;
  httpGiBps: string;
  rdmaP99Ms: string;
  httpP99Ms: string;
  ratio: string;
}

export const PEAK_PUT_AXIS_MAX_GIBPS = 4;
export const PEAK_GET_AXIS_MAX_GIBPS = 12;

export const peakThroughput: PeakSizeRow[] = [
  { sizeMiB: 4, putRdmaGiBps: "1.19", putHttpGiBps: "0.82", getRdmaGiBps: "7.20", getHttpGiBps: "3.46" },
  { sizeMiB: 8, putRdmaGiBps: "1.81", putHttpGiBps: "1.07", getRdmaGiBps: "9.71", getHttpGiBps: "4.04" },
  { sizeMiB: 16, putRdmaGiBps: "2.48", putHttpGiBps: null, getRdmaGiBps: "10.21", getHttpGiBps: null },
  { sizeMiB: 64, putRdmaGiBps: "3.25", putHttpGiBps: "1.01", getRdmaGiBps: "11.29", getHttpGiBps: null },
  { sizeMiB: 128, putRdmaGiBps: "3.60", putHttpGiBps: null, getRdmaGiBps: "11.42", getHttpGiBps: null },
  { sizeMiB: 256, putRdmaGiBps: "3.78", putHttpGiBps: null, getRdmaGiBps: "11.77", getHttpGiBps: null },
];

export const sameConcurrency: ConcurrencyRow[] = [
  {
    sizeMiB: 4,
    operation: "PUT",
    concurrency: 64,
    rdmaGiBps: "1.190",
    httpGiBps: "0.823",
    rdmaP99Ms: "290.1",
    httpP99Ms: "438.2",
    ratio: "1.45x",
  },
  {
    sizeMiB: 4,
    operation: "GET",
    concurrency: 256,
    rdmaGiBps: "7.097",
    httpGiBps: "3.462",
    rdmaP99Ms: "182.0",
    httpP99Ms: "389.4",
    ratio: "2.05x",
  },
  {
    sizeMiB: 8,
    operation: "PUT",
    concurrency: 64,
    rdmaGiBps: "1.811",
    httpGiBps: "1.066",
    rdmaP99Ms: "386.9",
    httpP99Ms: "716.8",
    ratio: "1.70x",
  },
  {
    sizeMiB: 8,
    operation: "GET",
    concurrency: 16,
    rdmaGiBps: "7.895",
    httpGiBps: "4.038",
    rdmaP99Ms: "21.8",
    httpP99Ms: "42.6",
    ratio: "1.95x",
  },
  {
    sizeMiB: 64,
    operation: "PUT",
    concurrency: 8,
    rdmaGiBps: "1.762",
    httpGiBps: "1.006",
    rdmaP99Ms: "325.1",
    httpP99Ms: "527.6",
    ratio: "1.75x",
  },
];

export const labSetup =
  "Laboratory data, 18–19 November 2026 (Asia/Shanghai). Two clients, two servers, six SSDs, EC:3. RDMA scans used a 100-second window and HTTP scans used a 60-second window. The server builds also differed.";
