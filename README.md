# Docu-Store

A simple document storage service built with Node.js, Express, and TypeScript.  It allows you to store, retrieve, and delete text content using unique keys.  The service uses the local file system for storage in development and `/tmp` in production.

## Features

* **PUT:** Stores content associated with a given key.  Supports nested key paths (e.g., `myfolder/mysubfolder/mydocument`).
* **GET:** Retrieves content by key.
* **DELETE:** Deletes content and its associated key.
* **Error Handling:** Provides informative error messages and appropriate status codes.
* **Asynchronous Operations:** Uses async/await for efficient handling of file system operations.
* **TypeScript:** Written in TypeScript for improved code maintainability and type safety.

## Getting Started

This service is designed to be run as a standalone server.  You will need Node.js and npm installed.

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Set environment variables (see below).
4. Start the server: `npm start`

## Environment Variables

* `PORT`: The port the server will listen on (defaults to 3000).
* `PROJECT_MODE`: Set to 'production' to use `/tmp` as the storage directory. Defaults to development mode which uses the project's directory.


## Usage

The Docu-Store service exposes the following endpoints:

* **PUT:** `POST /put` - Requires `key` and `content` in the request body.
* **GET:** `POST /get` - Requires `key` in the request body.
* **DELETE:** `POST /delete` - Requires `key` in the request body.

A client library (`DocuStore.ts`) is included to simplify interaction with these endpoints.  See `DocuStore.ts` for usage examples.


## Structure

* `index.ts`: Main server file.
* `DocuStore.ts`: Client library for interacting with the storage service.
* `utils/ApiResponse.ts`: Utility class for standardized API responses.
* `utils/ApiError.ts`: Utility class for standardized API errors.
* `utils/AsyncHandler.ts`: Express middleware for handling asynchronous route handlers.



## Contributing


Contributions are welcome! Please feel free to submit issues and pull requests.
