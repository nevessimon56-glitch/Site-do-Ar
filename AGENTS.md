# AGENTS.md

Guidance for AI agents working in this repository.

## Project status

**Site-do-Ar** is currently a **greenfield stub**: the only tracked project file is `README.md` (title: `# Site-do-Ar`). There is no application source, dependency manifest, Docker/Compose config, CI workflow, or test suite yet.

When application code is added, update this file (especially the Cloud section below) with real install, lint, test, and run commands.

## Repository layout

| Path | Purpose |
|------|---------|
| `README.md` | Project title / placeholder |
| `AGENTS.md` | Agent and Cloud VM instructions (this file) |

## Expected stack (TBD)

The repository name suggests a website or web application may be added later. Until manifests land in the repo, do **not** assume Node, Python, or another stack—read `package.json`, `pyproject.toml`, `Dockerfile`, etc. when they appear.

## Cursor Cloud specific instructions

### What runs today

There are **no services** to start, no ports to bind, and no lint/test/build scripts. Environment setup is limited to keeping the git workspace current; dependency installation will apply once manifests exist.

### VM capabilities (verified on Cloud Agent images)

- **Git** — clone, branch, commit, push work against `origin` on `main`.
- **Node.js** — v22.x via nvm (`node`, `npm`, `pnpm`, `yarn` on PATH).
- **Python** — 3.12 (`python3`, `pip`).
- **Docker** — not required for the current repo; may be absent unless added to the environment later.

### After code is added

1. Read the root `README.md` and any new `AGENTS.md` sections from contributors.
2. Install dependencies using the repo’s lockfile (e.g. `pnpm install`, `pip install -r requirements.txt`).
3. Document in this section:
   - Required vs optional services (and ports)
   - Dev server command (e.g. `pnpm dev`)
   - Lint and test commands
   - Any non-obvious env vars or `.env.example` steps
4. Prefer pointing to `package.json` scripts or `Makefile` targets instead of duplicating long command lists here.

### Gotchas

- **Hot reload**: if dependencies change while a dev server is running, some frameworks need a restart—note that here once a stack is chosen.
- **Empty update script**: until a lockfile exists, the VM `update_script` is a no-op (`true`); replace it with real install commands when dependencies are committed.
