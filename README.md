# SoundverseAI DNA

A full-stack web application for artists to upload, manage, and preview audio tracks with DNA tagging and licensing. Features a modern, responsive UI (built with Next.js and Tailwind CSS), robust artist/audio upload workflow, and a FastAPI backend for audio file handling and artist data management.

## Features
- Fully responsive artist and upload pages (Next.js + Tailwind CSS)
- Audio preview for uploaded and seeded artists
- Modern UI with glassmorphism and gradient effects
- Python FastAPI backend for artist and audio file management
- Static file serving for uploaded audio previews
- Environment-based configuration for easy deployment

---

## Local Development Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Python](https://www.python.org/) (3.8+ recommended)
- [PostgreSQL](https://www.postgresql.org/) (or your preferred DB, if used)
- [Git](https://git-scm.com/)

### 2. Clone the Repository
```sh
git clone https://github.com/YOUR_USERNAME/soundverseai-dna.git
cd soundverseai-dna
```

### 3. Install Frontend Dependencies
```sh
cd apps/web
npm install
# or
yarn install
```

### 4. Install Backend Dependencies
```sh
cd ../../apps/api
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt
```

### 5. Environment Variables

#### Frontend (`apps/web/.env`):
```
NEXT_PUBLIC_BACKEND_URI=http://localhost:8000
```

#### Backend (`apps/api/.env`):
```
DATABASE_URL=postgresql+asyncpg://postgres:<yourpassword>@localhost:5432/dna_db
```

- Make sure your database is running and accessible.

---

### 6. Running the Backend (FastAPI)
```sh
cd apps/api
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

- By default, uploaded audio files will be served from `/static/`.

### 7. Running the Frontend (Next.js)
```sh
cd ../../apps/web
npm run dev
# or
yarn dev
```

- The app will be available at [http://localhost:3000](http://localhost:3000)

---

## Usage
- Go to `/upload-audio` to upload a new artist and audio preview.
- Uploaded artists and their previews will appear on the `/artists` page.
- All pages are fully responsive and support modern browsers and mobile devices.

## Project Structure
```
SoundverseAI_DNA/
├── apps/
│   ├── api/        # FastAPI backend
│   └── web/        # Next.js frontend
├── packages/       # (if using Turborepo packages)
├── .gitignore
├── README.md
└── ...
```

## .gitignore
This project ignores all Node.js, Python, and OS-specific files. If you use GitHub's template, select `Node` and `Python` (you can also add `VisualStudioCode` for `.vscode/`).

## Contributing
Pull requests welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)


## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build
yarn dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=docs

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=web

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo login

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo link

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
