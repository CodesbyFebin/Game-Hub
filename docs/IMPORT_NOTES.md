# GameHub PRO reference rebuild: import notes

This branch is an initial **reviewable UI baseline**, not the complete locally uploaded Next.js project. The repository started completely empty.

The user-provided build archive \`GameHub_PRO_Reference_UI_Rebuild.zip\` has a much larger multi-route codebase, Prisma models, event handling, and design assets. Do **not** mistake the starter screens for verified production backends or pixel-perfect screenshot reconstructions.

## Safe full-project import
1. Download the latest GameHub PRO build archive from the original ChatGPT conversation.
2. Extract it to a local Git worktree for this repository.
3. **Do not copy** \`.env\`, \`.env.local\`, \`.git\`, private keys, SQLite databases, log files, build caches or vendor dependencies.
4. Compare and merge existing source into the worktree; keep \`.gitignore\` and \`.env.example\` protections.
5. Validate \`npm install\`, \`npm run typecheck\`, \`npm run build\` and browser interactions; Prisma migration and seed behavior require separate database review.
6. Create a new pull request with the reviewed, sanitized code.
7. Add Sarvam and database credentials to server-side deployment settings, never into Git.
8. Do not advertise third-party OAuth, GH Coin payouts, streams or purchases as live until verified.

## Design fidelity
Use the 35-page GameHub playbook and supplied screenshots for visual QA. Prioritize Home, Daily Events, Library and GameHub Connect first. Art depicted in composite screenshots is not automatically available as isolated, redistributable assets.

## Known blockers
No end-to-end test of Sarvam, authentication, wallet, streaming or payments has been performed for this starter. Add server-side auth, durable rate limiting, credit ledger and production abuse prevention before public release.
