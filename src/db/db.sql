ALTER SEQUENCE drivers_id_seq RESTART WITH 1

/* -------------------------------------------------------------------------- */

CREATE TABLE drivers (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  display_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT,
  registered_on TIMESTAMPTZ NOT NULL,
  registered_with VARCHAR(6) NOT NULL, -- (local, google)
  accumulated_time INTEGER DEFAULT 0
)

/* -------------------------------------------------------------------------- */

CREATE TABLE addresses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  available INT,
  occupied INT,
  position NUMERIC[]
)

INSERT INTO 
addresses(name, available, occupied, position)
VALUES
('Λεωνίδου 8-14', 8, 0, ARRAY [38.899054710586164, 22.436231155587485]),
('Όθωνος 4-14', 16, 0, ARRAY [38.90147594258852, 22.4344295819291]),
('Όθωνος 14-24', 16, 0, ARRAY [38.90125253411168, 22.435539599976444]),
('Όθωνος 24-32', 12, 0, ARRAY [38.901025702087644, 22.43668047887059]),
('Χατζοπούλου 1-5', 10, 0, ARRAY [38.89951847360332, 22.435043861994966]),
('Χατζοπούλου 2-6,5-13', 16, 0, ARRAY [38.89923681669934, 22.43441734896569]);

/* -------------------------------------------------------------------------- */