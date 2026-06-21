GreenTech Customer Portal & Carbon Calculator

Overview

GreenTech Customer Portal & Carbon Calculator is a full-stack web application developed as part of a T-Level Occupational Specialism Project.

The application was designed around the requirements of a fictional green technology company and provides users with tools to calculate their carbon footprint, manage appointments, and monitor their environmental impact through a personalised dashboard.

Features

User Authentication

* User registration and login system
* Password hashing using bcrypt
* Session-based authentication using Express Session
* Protected member-only routes

Carbon Footprint Calculator

* Calculates estimated carbon emissions based on electricity consumption and travel distance
* Stores calculation history for authenticated users
* Allows users to track their environmental impact over time

Booking System

* Schedule consultations or installations
* Store booking information in a MySQL database
* View booking history from the dashboard
* Delete existing bookings

User Dashboard

* Personalised user dashboard
* Displays booking history
* Displays carbon calculator history
* Includes graphical data visualisation using Chart.js

Additional Pages

* Homepage
* Products page
* Blog page
* Login and signup pages

Technologies Used

Backend

* Node.js
* Express.js
* MySQL
* bcryptjs
* express-session

Frontend

* HTML
* CSS
* EJS
* Bootstrap
* JavaScript
* Chart.js

Development Tools

* Git
* GitHub
* MySQL Workbench
* Visual Studio Code

Demonstration

A video demonstration of the project can be viewed here:

https://youtu.be/ZGpQ65vAVZo

Project Evaluation

The application was evaluated through user testing involving both technical and non-technical users.

Key findings:

* Users successfully created accounts and logged in
* Users successfully calculated carbon footprints
* Users successfully created and managed bookings
* Users were able to navigate the dashboard effectively

The project achieved an average evaluation score of approximately 8.2/10 during testing.

Future Improvements

Potential future enhancements include:

* Email verification
* Password reset functionality
* Booking time selection
* Product ordering functionality
* Enhanced dashboard analytics
* Additional carbon calculator metrics
* Improved mobile responsiveness
* User profile customisation

Installation

1. Clone the repository

git clone https://github.com/YOUR_USERNAME/greentech-customer-portal.git

2. Install dependencies

npm install

3. Configure environment variables

Create a .env file and configure:

MYSQL_HOST=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=
PORT=3306

4. Import the database schema into MySQL

Database.sql

5. Start the application

node app.js

6. Open in browser

http://localhost:3000

Disclaimer

This project was developed as part of a T-Level Occupational Specialism Project and is intended for educational and portfolio purposes.
