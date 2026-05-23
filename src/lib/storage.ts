import fs from "fs";
import path from "path";
import { Redis } from "@upstash/redis";

const dataDir = path.join(process.cwd(), "src", "data");

let kvClient: Redis | null = null;

function getKv(): Redis | null {
  if (kvClient) return kvClient;
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    kvClient = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
  return kvClient;
}

function readJSON<T>(filename: string): T {
  const filePath = path.join(dataDir, filename);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent);
}

function writeJSON<T>(filename: string, data: T): boolean {
  try {
    const filePath = path.join(dataDir, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch {
    return false;
  }
}

export async function getData<T>(filename: string): Promise<T> {
  const client = getKv();
  if (client) {
    try {
      const cached = await client.get(`portfolio:${filename}`);
      if (cached) return JSON.parse(JSON.stringify(cached));
    } catch {}
  }
  return readJSON<T>(filename);
}

export async function setData<T>(filename: string, data: T): Promise<void> {
  const client = getKv();
  if (client) {
    try {
      await client.set(`portfolio:${filename}`, data);
      return;
    } catch {}
  }
  writeJSON(filename, data);
}
