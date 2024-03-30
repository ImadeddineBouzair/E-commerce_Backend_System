# E-commerce API

## Overview

This repository contains the E-commerce API, a robust and scalable RESTful API designed to power e-commerce platforms. It provides a comprehensive suite of functionalities for user authentication, product management, order processing, and account maintenance.

## Features

- **User Authentication**: Secure endpoints for user sign-up, sign-in, and account deactivation.
- **Product Management**: APIs to create, update, retrieve, and delete product listings.
- **Account Maintenance**: Services for updating user profiles and managing user access.

## Usage

This collection is designed for developers integrating the EcommerceAPI into their applications, providing a modular approach to building a robust e-commerce system.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

- `NODE_ENV` - Specifies the environment in which the API is running (development/production).
- `PORT` - Defines the port on which the API will listen.
- `DB_PASSWORD` - The password for the database user (MongoDb Database).
- `DB_URL` - The URL for the database connection.
- `JWT_SECRET_KEY` - A secret key used for signing JSON Web Tokens.
- `JWT_EXPIRES_IN` - The expiration time for the JSON Web Tokens.
- `COOKIE_EXPIRES_IN` - The expiration time for the authentication cookie.

## Installation

Follow these steps to set up and run the E-commerce API locally:

1. **Clone the repository:**

   git clone https://github.com/ImadeddineBouzair/E-commerce_Backend_System.git

# Install dependencies

npm install

# Run the API

npm start

## Documentation

Each endpoint within this collection is documented with detailed descriptions, request/response schemas, and example use cases to provide a clear understanding of its functionality.
[Visit documentation][https://documenter.getpostman.com/view/25731393/2sA35G2MN8]
