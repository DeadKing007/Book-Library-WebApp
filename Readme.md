1. Extract the files 
2. Install Vscode/Intellij, nodeJs and postgress sql in your system.
3. Make sure to update path as well in environment variables for node.js
3. Postgress SQL Next steps:
	a. We need to create databse manually using: 
	CREATE DATABASE bookstore;
	b. Move iniside your databse created above:
	 \c bookstore
	C. Create 2 tables for books and users as below:

	CREATE TABLE books (
		id serial PRIMARY KEY,
		title varchar(255) NOT NULL,
		author varchar(255) NOT NULL,
		genre varchar(255) NOT NULL
	);

	CREATE TABLE users(
		id serial PRIMARY KEY,
		username varchar(255) NOT NULL,
		password varchar(255) NOT NULL
	);

	Books table is used to store the data for books and users table will be used to store users credentials;

4. Open the Backend code in VS code/VIntellij,  update the password for postgress SQL in models/db.js file.
5. Run the backend code using command - node server.js.
6. Opend the Frontend code in VS code/Intellij,  and run it using command - npm start.
7. Open the webapp hosted at: http://localhost:3000/
