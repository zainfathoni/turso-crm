import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/http";
import * as schema from "../../drizzle/schema";

interface Env {
  TURSO_DB_AUTH_TOKEN?: string;
  TURSO_DB_URL?: string;
}

export function buildDbClient() {
  const url = (process.env as unknown as Env).TURSO_DB_URL?.trim();
  if (url === undefined) {
    throw new Error("TURSO_DB_URL is not defined");
  }

  const authToken = (process.env as unknown as Env).TURSO_DB_AUTH_TOKEN?.trim();
  if (authToken === undefined) {
    throw new Error("TURSO_DB_AUTH_TOKEN is not defined");
  }

  return drizzle(createClient({ url, authToken }), { schema });
}
