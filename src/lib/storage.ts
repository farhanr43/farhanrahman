import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "src", "data");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let kvClient: any = null;

async function getKv() {
  if (kvClient) return kvClient;
  try {
    const mod = await import("@vercel/kv");
    kvClient = mod.kv;
  } catch {
    kvClient = null;
  }
  return kvClient;
}

function readJSON<T>(filename: string): T {
  const filePath = path.join(dataDir, filename);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent);
}

function writeJSON<T>(filename: string, data: T): void {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function getData<T>(filename: string): Promise<T> {
  const client = await getKv();
  if (client && process.env.KV_URL) {
    try {
      const cached = await client.get(`portfolio:${filename}`);
      if (cached) return JSON.parse(JSON.stringify(cached));
    } catch {}
  }
  return readJSON<T>(filename);
}

export async function setData<T>(filename: string, data: T): Promise<void> {
  const client = await getKv();
  if (client && process.env.KV_URL) {
    try {
      await client.set(`portfolio:${filename}`, data);
      return;
    } catch {}
  }
  writeJSON(filename, data);
}
