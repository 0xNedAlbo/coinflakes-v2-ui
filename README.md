# coinflakes-v2-ui

This repository contains the user interface for the Coinflakes Vault v2. This project provides a front-end application built with Next.js, designed to interact with the Coinflakes Vault v2 smart contracts.

## Table of Contents

- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Development Server](#running-the-development-server)
- [Building for Production](#building-for-production)
- [Running the Production Server](#running-the-production-server)
- [Generating Code with wagmi.config.ts](#generating-code-with-wagmiconfigts)
- [License](#license)

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/coinflakes-v2-ui.git
cd coinflakes-v2-ui
npm install
```

## Environment Setup

The project uses environment variables stored in `.env.production` and `.env.development` files. These files need to be configured based on the provided `.env.example` file.

1. Copy `.env.example` to create `.env.development` and `.env.production`:

   ```bash
   cp .env.example .env.development
   cp .env.example .env.production
   ```

2. Open the `.env.development` and `.env.production` files and modify the variables according to your environment needs.

## Generating Code with wagmi.config.ts

The project includes a `wagmi.config.ts` file that automatically generates code necessary for interacting with the blockchain. To generate the code, run:

```bash
# Generates code at src/generated
npm run wagmi:generate
```

Ensure that you run this command whenever you make changes to the configuration or need to update the generated code. The
generated code is not part of the git repo.

## Running the Development Server

To start the development server, run:

```bash
npm run dev
```

This command starts a local development server on `http://localhost:3000`. The server will automatically reload if you make changes to the code.

## Building for Production

To build the project for production, run:

```bash
npm run build
```

This command compiles your application for production use.

## Running the Production Server

After building the project, you can start the production server using:

```bash
npm run start
```

This will serve the production build on `http://localhost:3000`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
