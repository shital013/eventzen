
# EventZen - Event Management System

EventZen is a **full-stack event management system** that enables seamless event scheduling, attendee management, and budget tracking. The platform allows both event organizers and attendees to interact, register, and manage event-related activities efficiently.

## Features

### 1. **User Authentication**
   - Sign up and log in as a customer or an admin.

### 2. **Event Scheduling**
   - Easily schedule events and manage venue bookings.

### 3. **Customer Engagement**
   - A user-friendly platform for customers to view events, make bookings, and receive updates.

## Technologies Used

### **Backend:**
- **Java Spring Boot**: For creating REST APIs and managing backend logic.
- **MySQL**: For database management.
- **Hibernate**: For object-relational mapping (ORM).

### **Frontend:**
- **ReactJS**: For building interactive UI.
- **Material UI**: For pre-designed React components.
- **CSS**: For styling the user interface.

### **Tools:**
- **IntelliJ IDEA**: For backend development.
- **Visual Studio Code**: For frontend development.
- **Docker**: For containerizing the application and making it easier to deploy.

---

## How to Run the Application

### 1. **Clone the Repository**

Clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/eventzen.git
cd eventzen
```

### 2. **Set Up Backend**

Go to the backend directory:

```bash
cd backend
```

#### Build the backend application:

```bash
mvn clean install
```

#### Run the backend application using Docker:

```bash
docker-compose up
```

### 3. **Set Up Frontend**

Go to the frontend directory:

```bash
cd frontend
```

#### Install dependencies:

```bash
npm install
```

#### Build the frontend application:

```bash
npm run build
```

#### Dockerize the frontend:

```bash
docker build -t eventzen-frontend .
```

### 4. **Run the Entire Application with Docker Compose**

Run the full application using Docker Compose:

```bash
docker-compose up
```

This command will build and start the backend, frontend, and database in containers. Your app will be available at `http://localhost:80` (or whatever port you mapped).

---

## Endpoints

### **User Authentication:**

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login an existing user.

### **Event Management:**

- **GET /api/events**: Get a list of all events.
- **POST /api/events**: Add a new event.


---

## Dockerization

This application is fully containerized with Docker. The `docker-compose.yml` file is included to orchestrate multiple containers, including:

- **Backend** (Spring Boot application)
- **Frontend** (React application)
- **MySQL Database**

---
