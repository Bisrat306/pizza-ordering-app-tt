
# Pizza Ordering App

## Overview

The Pizza Ordering App is a web application that allows users to browse a menu, place orders, and track the status of their orders. It provides a user-friendly interface for both customers and administrators.

## Features

- Browse menu items with details such as name, description, images, and price.
- Place and manage orders.
- Track the status of orders in real-time.
- Admin panel for managing menu items and orders.
 
## System Architecture Overview

The Pizza Ordering App follows a modern and scalable architecture. The system is designed to be modular, with separate services for frontend, backend, and databases, providing scalability, maintainability, and ease of development.

### Technologies Used

- **Frontend:**
  - React: A declarative, efficient, and flexible JavaScript library for building user interfaces.
  - Next.js: A React framework for server-side rendering, static site generation, and modern frontend development.

- **Backend:**
  - NestJS: A progressive Node.js framework for building efficient, scalable, and maintainable server-side applications.
  - Socket.IO: A library that enables real-time, bidirectional, and event-based communication between clients and servers.

- **Databases:**
  - PostgreSQL: A powerful, open-source relational database system.
  - Redis: An in-memory data structure store, used for caching and real-time data processing.

### Advantages of the System Architecture

1. **Scalability:**
   - The architecture allows for individual services to scale independently based on demand.
   - Use of Redis for caching enhances performance and scalability.

2. **Real-time Communication:**
   - Socket.IO enables real-time communication between the server and clients, providing instant updates on order status.

3. **Reliability and Maintainability:**
   - NestJS, with its modular structure and TypeScript support, enhances code maintainability and facilitates easier bug detection.
   - PostgreSQL ensures data integrity and reliability for transactional data.

4. **Flexibility:**
   - Next.js provides flexibility with server-side rendering and static site generation, optimizing performance and SEO.

## Configuration

- Environment variables can be configured in a `.env` file for both frontend and backend. i.e 2 separate `.env` files in `client` and `server`

## Project Structure

- `/client`: Contains the source code for the frontend React application.
- `/server`: Contains the backend server code using Nest.js and Postgres.
- `/server/db`: Contains the databse dump ready for import.

## Setup

1. Clone the repository: `git clone https://github.com/Bisrat306/pizza-ordering-app-tt.git`
2. Navigate to the project folder: `cd pizza-ordering-app-tt`
3. Navigate to `client` 
4. Set up environment variables.
5. Install the client application: `npm install`
6. To Run the application: `npm run dev` App will run on port `3000`
7. Navigate to `server` 
8. Set up environment variables with right credentials inside `env`. `env.template` can be found for setup guide of `.env`.
9. Navigate to `server/db` using terminal input the following
    `psql -U <username> -h <hostname> -d <database_name> -f dump.sql
`
    - Replace  username, hostname(if hosted remotely, otherwise remove -h <hostname> totally), database_name
    -run command
9. Finally Run the application: `npm run start:dev`. application will be served on port 5000

## Links
User - `http://localhost:3000`
Admin = `http://localhost:3000/orders`

## Authors

- [@bisrat306](https://www.github.com/bisrat306)