# Nexus Hub

## Description

This project is a modular and dynamic web application designed to efficiently manage various microservices through a backend built in NodeJS. The architecture encompasses multiple microservices, including Onboarding (user authentication and registration), Weather (providing weather information), Console (In-Depth Details about all microservices messages on UI), Service Status (checking microservice health), and more planned for future implementation.

## Backend

The backend of this project is built in NodeJS using RestApi routes, Socket.IO connections and consists of multiple microservices. The main microservices include:

- **Onboarding:** Manages user authentication, registration, and database operations.
- **Weather:** Provides weather information.
- **Console:** WIP
- **Service Status:** Checks the status of each microservice.

New microservices will be added in the future.

## Frontend

The frontend is developed using React with Vite and TypeScript. It is a dynamic, modular webpage where users can create, delete, and arrange panels. Each panel is associated with a specific microservice from the backend, established through REST requests or Socket.IO.

### Key Features

- Dynamic webpage with modular panels.
- Right-click context menu for each panel.
- Mosaic-like layout for arranging panels.
- Creation and deletion of panels.

### Panel Types

- **Weather:** [Description]
- **Console:** [Description]
- **System Diagnostics:** [Description]

## Getting Started

Provide instructions on how to set up and run the project locally.

## Usage

Explain how users can interact with the frontend and what functionality each panel provides.

## Contributing

If you'd like to contribute to the project, please follow the guidelines in [CONTRIBUTING.md].

## License

This project is licensed under the [License Name] - see the [LICENSE.md] file for details.
