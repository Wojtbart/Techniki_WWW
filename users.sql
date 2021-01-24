CREATE DATABASE IF NOT EXISTS users CHARACTER SET utf8 COLLATE utf8_general_ci;
USE users;


CREATE TABLE IF NOT EXISTS Accounts(
  id INT NOT NULL auto_increment primary key,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  email VARCHAR(50) not null
);

INSERT INTO Accounts(username,password,email) VALUES('wojtek','wojtek','wojtek@gmail.com');
INSERT INTO Accounts(username,password,email) VALUES('test','123','123@gmail.com');

SELECT * FROM Accounts;


CREATE TABLE IF NOT EXISTS tasks (
  id INT NOT NULL auto_increment primary key,
  task varchar(100) NOT NULL,
  dataDodania date not null,
  opis varchar(500) NOT NULL,
  klient varchar(100) not null,
  id_technika int not null,
  statusZadania tinyint(1) NOT NULL DEFAULT '0',
  FOREIGN KEY(id_technika) references Accounts (id)
);


INSERT INTO tasks(task,dataDodania,opis,klient,id_technika,statusZadania) VALUES('Brak internetu','2017-06-15','Na ulicy ślicznej brak internetu z routera','Anna Nowak',1,0);

SELECT * FROM tasks;

/* to mi pomogło 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Siemankobyku!36';
flush privileges;

drop database users;
*/ 

