# AI Resume Builder

This is a full-stack application with a React frontend and a Spring Boot backend.
It uses a simulated AI engine to analyze resumes against job descriptions without requiring external API keys.

## Project Structure

- `frontend`: React application (Vite)
- `backend`: Spring Boot application (Maven)

## Prerequisites

- Node.js (v14+)
- Java (v8+)
- Maven (or an IDE like IntelliJ IDEA / Eclipse that includes Maven)

## How to Run

### 1. Start the Backend

The backend runs on port `8080`.

**Option A: Using an IDE (Recommended)**
1. Open the `backend` folder in IntelliJ IDEA or Eclipse.
2. Import it as a Maven Project.
3. Run the `AiResumeBuilderApplication` class.

**Option B: Using Command Line (if Maven is installed)**
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### 2. Start the Frontend

The frontend runs on port `5173`.

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173`.

## Features

- **Resume Analysis**: Input your details and get an instant match score for your target role.
- **Keyword Optimization**: Use the built-in AI logic to find missing keywords in your resume comparing to industry standards.
- **Rich UI**: Modern dark-themed interface with responsive design.
