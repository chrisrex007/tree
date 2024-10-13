# Tree View Application

## Table of Contents

- [Technologies Used](#technologies-used)
- [About The Project](#about-the-project)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup Instructions](#setup-instructions)
- [Running the Project](#running-the-project)
  - [Run Locally](#run-locally)
  - [Run Using Docker](#run-using-docker)
- [Deployment](#deployment)

## Technologies Used

1. React: A JavaScript library for building user interfaces, especially single-page applications (SPA). It enables fast, interactive UI development with its component-based structure.

2. Vite: A modern build tool that provides a faster development experience by serving code over native ES modules. It handles hot module replacement (HMR) and builds the application efficiently.

3. Node.js: A runtime environment that executes Javascript code server-side. I used it to handle the backend logic and serve API endpoints.

4. Express: A minimalist web framework for Node.js used to build APIs and handle HTTP requests.

5. Docker: A platform to develop, ship, and run applications inside containers. Containers package the app with its dependencies, ensuring consistency across different environments.

6. Nginx: A high-performance web server that acts as a reverse proxy, serving the React frontend and proxying API requests to the backend.

7. Docker Compose: A tool for defining and running multi-container Docker applications. It orchestrates the client, server, and proxy services in a seamless development workflow.

8. Tailwind CSS: For styling purposes.

## About The Project

- Godowns (or warehouses) require efficiently managing stored items such as toys, electronics, and tools. It's
  crucial to visualize the hierarchy of locations and the items within them to keep inventory organized and
  manageable.
- Frontend uses React + Vite (in Typescript) for better development purposes.
- In the Project, I have created two Components Home and Sidebar. Home component shows the product you've selected and Sidebar component shows the list of all products. I've used tailwind css to add animations and transitions.
- JSON is kept as the database of this project which is kept in the server directory. JSON data is fetched in the client from the server. Important Algorithms wherever required are used in the various components.
- Small screen frontend is handled differently. App is responsive so you can visit through Mobile too.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/chrisrex007/tree.git
   ```

2. **Navigate into the project directory:**

   ```bash
   cd tree
   ```

3. **Install dependencies for the client:**

   - Navigate to the `client` directory:
     ```bash
     cd client
     ```
   - Install the dependencies:
     ```bash
     npm install
     ```

4. **Install dependencies for the server:**

   - Navigate to the `server` directory:
     ```bash
     cd ../server
     ```
   - Install the dependencies:
     ```bash
     npm install
     ```

5. **Return to the root directory:**
   ```bash
   cd ..
   ```

## Running the Project

### Run Locally

1. **Start the backend server:**

   - Navigate to the `server` directory:
     ```bash
     cd server
     ```
   - Start the server:
     ```bash
     npm start
     ```

2. **In another terminal, start the frontend:**

   - Navigate to the `client` directory:
     ```bash
     cd ../client
     ```
   - Start the frontend:
     ```bash
     npm run dev
     ```

3. **Open your browser and navigate to:**
   - [http://localhost:5173](http://localhost:5173)

### Run Using Docker

1. **Make sure Docker is running on your machine.**

2. **Navigate to the root folder where the `docker-compose.yml` file is located:**

   ```bash
   cd tree
   ```

3. **Run the following command to start the services:**

   ```bash
   sudo systemctl start docker
   sudo docker compose up
   ```

4. **Open your browser and navigate to:**
   - [http://localhost](http://localhost) to access the application.

## Deployment

The Application is Deployed on Azure VM. (Make sure to use http instead of https)

- [4.240.80.152](http://4.240.80.152)
