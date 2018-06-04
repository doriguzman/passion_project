DROP DATABASE IF EXISTS caffeine;
CREATE DATABASE caffeine; 

\c caffeine

DROP TABLE IF EXISTS Users,Intake; 

CREATE TABLE Users
(
    id SERIAL UNIQUE,
    first_name VARCHAR, 
    username VARCHAR UNIQUE,  
    password_digest VARCHAR NOT NULL, 
    photo_url VARCHAR,
    PRIMARY KEY (id)
);
INSERT INTO Users 
(first_name, username, password_digest, photo_url)
VALUES 
('Mark', 'markguzman@gmail.com',  'markguzman123', 'https://www.jamiesale-cartoonist.com/wp-content/uploads/cartoon-business-man-free1-300x300.png');


CREATE TABLE Intake
(
    intake_id SERIAL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    user_id INTEGER NOT NULL, 
    brand VARCHAR,
    beverage VARCHAR, 
    size VARCHAR, 
    caffeine INTEGER, 
    intake_date DATE,
    intake_time VARCHAR, 
    sleep INTEGER, 
    mood VARCHAR,
    PRIMARY KEY (intake_id)
);
INSERT INTO Intake
    (user_id, brand, beverage, size, caffeine, intake_date, intake_time, sleep, mood)
VALUES
    (1, 'Starbucks', 'Hot Chocolate', 'tall', 20, '2018-05-20', '1:01', 8, 'happy');
    
