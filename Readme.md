🔧 Tech Stack Overview
Frontend (Port 5173)
Built using React and Vite for a faster dev experience.

I'm using TypeScript throughout for type safety.

Styling is handled using Tailwind CSS.

API calls are made with Axios.

CSS compatibility is ensured using PostCSS and Autoprefixer.

Backend (Port 3001)
Built with Node.js and Express, also in TypeScript.

I’m using Prisma as the ORM to interact with a PostgreSQL database.

JWT is used for authentication.

I’ve also added CORS to handle cross-origin issues and Axios here for calling external APIs.

Database
PostgreSQL with tables for:

Users (auth and user management)

Topics (structured learning topics)

Problems (coding challenges)

Submissions (user solutions)

Code Execution
Code is compiled and executed using Judge0 API via RapidAPI.

💡 Use Case / Purpose
The main goal is to give learners a centralized platform where they can:

Learn coding topics step by step

Practice problems in real time

Get immediate feedback from an online compiler

Track their progress and submissions

It's meant to be both educational and engaging, with potential for course integration or personal practice.

⚠️ Current Issues I'm Dealing With
Backend:
I’m getting a port conflict on 3001 (EADDRINUSE), likely because a server isn’t closing properly.

Prisma client isn’t generating correctly due to path configuration issues.

The Judge0 API key isn’t set up properly, so code execution isn’t working yet.

Frontend:
There’s a deprecated CommonJS warning with Vite.

I have a couple of moderate vulnerabilities in the dependency tree.

76 packages are showing as needing funding—not critical but worth noting.

Environment:
Some values in my .env file are missing or placeholders like JUDGE0_API_KEY and JWT_SECRET.

Java Runtime is missing, which is needed for some tools I might integrate.

Also noticing multiple instances of servers running—need to clean that up with a process manager like PM2.