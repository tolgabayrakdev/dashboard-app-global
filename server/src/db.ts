import pg from 'pg';

const dbA = "";

const client = new pg.Client({
  user: 'root',
  database: 'postgres',
  password: 'root123',
  host: 'localhost',
  port: 5432,
});

client.connect(function (err) {
  if (err) throw err;
  console.log('⚡️[Database]: PostgreSQL is connected');
});

export default client;
