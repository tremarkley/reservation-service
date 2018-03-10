const { Client } = require('pg');

// const client = new Client({
//   host: '172.17.0.2/16',
//   password: 'secretpassword',
//   port: 5432,
// });

const client = new Client({
  connectionString: 'postgres://postgres@172.17.0.2:5432/',
});
client.connect();
// client.connect();

client.query('CREATE DATABASE reservations;', (err, res) => {
  console.log('Finished dropping and creating db');
  console.log(err, res);
  const reservationsClient = new Client({
    connectionString: 'postgres://postgres@172.17.0.2:5432/reservations',
  });
  reservationsClient.connect();
  reservationsClient.query('CREATE TABLE listings (id SERIAL UNIQUE PRIMARY KEY, minimum_stay INTEGER NOT NULL,maximum_guests INTEGER NOT NULL); CREATE TABLE dates (id SERIAL UNIQUE PRIMARY KEY, month INTEGER NOT NULL, day INTEGER NOT NULL, year INTEGER NOT NULL, date date NOT NULL); CREATE TABLE reservations (id SERIAL UNIQUE PRIMARY KEY, listing_id INTEGER NOT NULL REFERENCES listings(id) ON DELETE CASCADE, date_id INTEGER  NOT NULL REFERENCES dates(id) ON DELETE RESTRICT, price NUMERIC(10, 2) NOT NULL, available BOOLEAN NOT NULL);', (err, res) => {
    console.log('finished creating schema');
    console.log(err, res);
    reservationsClient.end();
    client.end();
  });
});

// client.query('DROP DATABASE reservations; CREATE DATABASE reservations; \connect reservations; CREATE TABLE listings (id SERIAL UNIQUE PRIMARY KEY, minimum_stay INTEGER NOT NULL,maximum_guests INTEGER NOT NULL); CREATE TABLE dates (id SERIAL UNIQUE PRIMARY KEY, month INTEGER NOT NULL, day INTEGER NOT NULL, year INTEGER NOT NULL, date date NOT NULL); CREATE TABLE reservations (id SERIAL UNIQUE PRIMARY KEY, listing_id INTEGER NOT NULL REFERENCES listings(id) ON DELETE CASCADE, date_id INTEGER  NOT NULL REFERENCES dates(id) ON DELETE RESTRICT, price NUMERIC(10, 2) NOT NULL, available BOOLEAN NOT NULL);', (err, res) => {
//   console.log(err, res);
//   client.end();
// });
