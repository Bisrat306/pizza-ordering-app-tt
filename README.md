
# Pizza Ordering App

## Overview

The Pizza Ordering App is a web application that allows users to browse a menu, place orders, and track the status of their orders. It provides a user-friendly interface for both customers and administrators.

## Features

- Browse menu items with details such as name, description, images, and price.
- Place and manage orders.
- Track the status of orders in real-time.
- Admin panel for managing menu items and orders.

## Technologies Used

- **Frontend:**
  - NextJS: A JavaScript library for building user interfaces.
  - Redux: A state management library for React applications.
  - Mantine: A React component library for modern web applications.

- **Backend:**
  - Nest.js: A JavaScript runtime for server-side development.
  - Typeorm: TypeORM is an Object Relational Mapper.

- **Database:**
  - Postgres: An Open Source SQL Database.

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

## Usage

- Visit the live application [here](#) (replace with your deployment link).


