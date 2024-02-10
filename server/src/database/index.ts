import mariadb from 'mariadb';
import { validationResult } from 'express-validator';
import CONFIGS from '../configs';
import chalk from 'chalk';

const pool = mariadb.createPool(CONFIGS.db);

async function asyncFunction() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log(chalk.blue.bold(`Connected to MariaDB at ${CONFIGS.db.host}:${CONFIGS.db.port} as ${CONFIGS.db.user}`));
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}

asyncFunction();

export const db = {
  query: async (query: string, params: any[] = []) => {
    let conn;
    let res = '';
    try {
      conn = await pool.getConnection();
      res = await conn.query(query, params);
    } catch (err: any) {
      console.error(err);
      throw err;
    } finally {
      if (conn) {
        conn.end();
      }
      return res;
    }
  }
};

export default pool;
