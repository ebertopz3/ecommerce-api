import pg from 'pg'

export const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nodepgapis',
  password: 'yeny1710',
  port: 5432
})
