-- This file was used to input the database of the christmas app
DROP DATABASE IF EXISTS christmasdb;
CREATE DATABASE christmasdb;
USE chrsitmasdb;

CREATE TABLE production(
    producer_id SMALLINT UNSIGNED AUTO_INCREMENT NOT NULL, 
    producer VARCHAR(60),
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_producer PRIMARY KEY (producer_id)
);

RENAME TABLE production TO producer;



CREATE TABLE director (
    director_id SMALLINT UNSIGNED AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_director PRIMARY KEY (director_id)
);

CREATE TABLE streaming_platform (
    streaming_platform_id TINYINT UNSIGNED AUTO_INCREMENT NOT NULL,
    streaming_platform VARCHAR(30),
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_streaming PRIMARY KEY (streaming_platform_id)
);

CREATE TABLE actor (
    actor_id MEDIUMINT UNSIGNED AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    img_url BLOB,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_actor PRIMARY KEY (actor_id)
);

ALTER TABLE actor
MODIFY COLUMN img_url VARCHAR(100);

CREATE TABLE program(
    program_id MEDIUMINT UNSIGNED AUTO_INCREMENT NOT NULL,
    title VARCHAR(100) NOT NULL,
    yr_released YEAR,
    runtime TIME,
    producer_id SMALLINT UNSIGNED,
    format ENUM('live-action', 'stop-motion', 'animation')
    DEFAULT 'animation',
    program_rating ENUM('G', 'PG', 'TV-G', 'PG-13', 'R', 'NC-17', 'NR')
    DEFAULT 'NR',
    rating DECIMAL(2,1),
    img_url BLOB,
    description TINYTEXT,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_prog PRIMARY KEY (program_id),
    CONSTRAINT fk_producer FOREIGN KEY (producer_id) REFERENCES producer (producer_id)
);

ALTER TABLE program
MODIFY COLUMN img_url VARCHAR(100);

-- Pivot table
CREATE TABLE program_to_streaming(
    program_id MEDIUMINT UNSIGNED NOT NULL,
    streaming_platform_id TINYINT UNSIGNED NOT NULL,
    CONSTRAINT fk_prog_str FOREIGN KEY(program_id) REFERENCES program (program_id),
    CONSTRAINT fk_str_prog FOREIGN KEY (streaming_platform_id) REFERENCES streaming_platform (streaming_platform_id)
);

CREATE TABLE program_to_actor(
    program_id MEDIUMINT UNSIGNED NOT NULL,
    actor_id MEDIUMINT UNSIGNED NOT NULL,
    CONSTRAINT fk_prog_act FOREIGN KEY (program_id) REFERENCES program (program_id),
    CONSTRAINT fk_act_prog FOREIGN KEY (actor_id) REFERENCES actor (actor_id)
);
CREATE table program_to_director (
    program_id MEDIUMINT UNSIGNED NOT NULL,
    director_id SMALLINT UNSIGNED NOT NULL,
    CONSTRAINT fk_prog_dir FOREIGN KEY (program_id) REFERENCES program (program_id),
    CONSTRAINT fk_dir_prog FOREIGN KEY (director_id) REFERENCES director (director_id)
);