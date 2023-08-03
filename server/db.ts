import { Pool, PoolConfig } from "pg";

const poolConfig: PoolConfig = {
  user: "postgres",
  password: "sanaullah@129",
  host: "localhost",
  port: 5432,
  database: "taskvault"
};

const pool = new Pool(poolConfig);

export default pool; 