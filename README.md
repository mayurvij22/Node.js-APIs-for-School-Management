School Management API
A Node.js-based project that provides APIs for managing school data. The system allows adding new schools and retrieving a list of schools sorted by proximity to a user-specified location.

Features
Add School API: Add new schools with details such as name, address, latitude, and longitude.
List Schools API: Retrieve a list of schools sorted by distance from a given location.
MySQL Integration: Stores and manages school data in a MySQL database.
Tech Stack
Backend: Node.js, Express.js
Database: MySQL
Environment Variables: dotenv
Hosting: [Your Hosting Platform]
API Endpoints
1. Add School
Endpoint: /api/addSchool
Method: POST
Payload:
json
Copy code
{
  "name": "Green Valley School",
  "address": "123 Elm St",
  "latitude": 40.7128,
  "longitude": -74.0060
}
Response:
201 Created: School added successfully.
400 Bad Request: Invalid input data.
500 Internal Server Error: Database operation failed.
2. List Schools
Endpoint: /api/listSchools
Method: GET
Query Parameters:
latitude: User's latitude (e.g., 40.7128).
longitude: User's longitude (e.g., -74.0060).
Response: Sorted list of schools based on distance from the provided location.
json
Copy code
[
  {
    "id": 1,
    "name": "Green Valley School",
    "address": "123 Elm St",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "distance": 0.0
  }
]
Setup Instructions
Prerequisites
Install Node.js.
Install MySQL.
Steps to Run Locally
Clone the repository:
bash
Copy code
git clone https://github.com/yourusername/school-management-api.git
cd school-management-api
Install dependencies:
bash
Copy code
npm install
Set up .env file with the following variables:
plaintext
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=SchoolDB
PORT=3000
Create the schools table in MySQL:
sql
Copy code
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
Start the server:
bash
Copy code
npm start
Access the APIs at http://localhost:3000/api.
Deployment
The APIs are hosted at: [Your Hosting URL]

Testing with Postman
Import the provided Postman collection into Postman.
Use the /addSchool endpoint to add sample data.
Use the /listSchools endpoint to retrieve sorted results.
Folder Structure
bash
Copy code
school-management/
├── app.js
├── db/
│   └── connection.js
├── routes/
│   ├── schools.js
├── .env
├── package.json
└── README.md
License
This project is licensed under the MIT License. See the LICENSE file for details.

