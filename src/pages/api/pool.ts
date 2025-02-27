import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: process.env.DB_PASSWORD,
  database: "read-more-db",
  max: 20,
  idleTimeoutMillis: 30000,
});

export default pool;
