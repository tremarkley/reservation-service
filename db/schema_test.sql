DROP DATABASE reservations_test;
CREATE DATABASE reservations_test;
\connect reservations_test;

CREATE TABLE listings (
  id SERIAL UNIQUE PRIMARY KEY,
  minimum_stay INTEGER NOT NULL,
  maximum_guests INTEGER NOT NULL
);

CREATE TABLE dates (
  id SERIAL UNIQUE PRIMARY KEY,
  month INTEGER NOT NULL,
  day INTEGER NOT NULL,
  year INTEGER NOT NULL
);

CREATE TABLE reservations (
  id SERIAL UNIQUE PRIMARY KEY,
  listing_id INTEGER NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  date_id INTEGER  NOT NULL REFERENCES dates(id) ON DELETE RESTRICT,
  price NUMERIC(10, 2) NOT NULL,
  available BOOLEAN NOT NULL
);