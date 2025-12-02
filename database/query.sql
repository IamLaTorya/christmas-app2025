-- This file helped me setup my queries.
-- SELECT THE PROGRAM ID, TITLE, RATING, AND YEAR RELEASED FROM EACH PROGRAM
SELECT program_id, title, rating, yr_released FROM program;

-- SELECT THE FIRST AND LAST NAME OF EACH ACTOR. DISPLAY THE RESULTS IN ALPHABETICAL ORDER BY LAST NAME
SELECT first_name as first, last_name as last FROM actor ORDER BY last_name;

-- SELECT EVERY MOVIE THAT BEGINS WITH THE LETTER 'M'
SELECT title FROM program
WHERE title LIKE 'M%';

-- SELECT EVERY ACTOR WHOSE LAST NAME ENDS WITH THE LETTER G
SELECT first_name as f, last_name as l FROM actor
WHERE last_name LIKE '%G';

-- SELECT EVERY PROGRAM THAT IS AVALIABLE ON PEACOCK
SELECT p.title, p.rating, p.runtime, sp.streaming_platform 
FROM program p 
JOIN program_to_streaming USING (program_id)
JOIN streaming_platform sp USING (streaming_platform_id)
WHERE sp.streaming_platform = 'peacock';

-- SELECT EVERY ACTOR THAT WAS IN THE PROGRAM, HOW THE GRINCH STOLE CHRISTMAS
SELECT a.first_name, a.last_name, P.title
FROM actor a
JOIN program_to_actor USING (actor_id)
JOIN program p USING (program_id)
WHERE p.title = 'how the grinch stole christmas';

-- SELECT EVERY ANIMATION THAT WAS RELEASED IN THE 1990S DECADE
SELECT *
FROM program 
WHERE format = 'animation' AND yr_released BETWEEN 1990 AND 2000;

-- COUNT HOW MANY PROGRAMS ARE ANIMATION
SELECT COUNT(*) AS animation_count
FROM program
WHERE format = 'animation';

-- SELECT ALL THE PROGRAMS BY TITLE, PROGRAM_RATING, RATING FROM THE PROGRAM TO SHOW THE RATING BY LEAST TO GREATEST RATING.
SELECT 
title, 
program_rating, 
rating
FROM program

ORDER BY rating ASC;  

-- SELECT ALL THE PROGRAMS BY PROGRAM_ID, TITLE, YR_RELEASED, PRODUCER, FORMAT, PROGRAM_RATING FROM PROGRAM, PRODUCER.
SELECT program_id, title, yr_released, producer, format, program_rating FROM program, producer;

-- SELECT ALL THE PROGRAMS AND PRODUCER FROM PROGRAM JOIN PRODUCER USING PRODUCER ID WHERE PRODUCER ID = ID.
SELECT program.*, p.producer FROM program JOIN producer p USING (producer_id) WHERE p.producer_id = ${id};



