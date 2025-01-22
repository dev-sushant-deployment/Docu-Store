# Docu-Store

A simple document storage service built with Node.js and Express.

## Getting Started

This project uses environment variables.  Create a `.env` file in the root directory and add the following:

```
PORT=3000
PROJECT_MODE=development
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Project Structure

- `index.ts`: The main entry point for the application.
- `types.d.ts`: TypeScript type definitions for environment variables.


## Future Enhancements

This is a basic implementation. Future enhancements could include:

- Actual document storage functionality (e.g., using a database or cloud storage).
- API endpoints for uploading, downloading, and managing documents.
- User authentication and authorization.
- More robust error handling and logging.
