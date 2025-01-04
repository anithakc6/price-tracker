export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.PG_RDS_ENDPOINT || 'localhost',
    port: parseInt(process.env.PG_PORT, 10) || 5432,
    database: process.env.PG_DATABASE || 'postgres',
    username: process.env.PG_USER || 'postgres',
    schema: process.env.PG_SCHEMA || 'public',
    password: process.env.PG_PASSWORD || 'root',
  },
});
