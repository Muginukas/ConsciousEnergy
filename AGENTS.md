<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:deployment-workflow -->
# Deployment workflow (preview → auto-merge → verify)

The production branch is `claude/consciousenergy-project-plan-bBHmO`, deployed to
https://consciousenergy.vercel.app via Vercel's GitHub integration. Do NOT push
directly to it; every change goes through a pull request.

The user has given standing approval to merge without asking (they review the
live site afterwards and report problems to fix). For every change:

1. Develop on a feature branch; run lint, typecheck and `next build`, and check
   the pages at phone width before pushing.
2. Open a pull request targeting the production branch. Vercel automatically
   builds a preview deployment and posts its URL as a PR comment.
3. Wait until the Vercel preview deployment succeeds (commit status "Vercel"
   is success). If it fails, fix the cause first — never merge a red PR.
4. Merge the PR into the production branch without waiting for approval —
   this triggers the Vercel production deploy.
5. Confirm the production deploy is READY and the changed pages are live on
   https://consciousenergy.vercel.app. If the production build fails for a
   transient reason (e.g. a Google Fonts fetch), redeploy it; otherwise fix
   and ship a follow-up PR.
6. Tell the user what shipped, with links to the live pages. Push
   notifications reach their phone via the Claude mobile app.
<!-- END:deployment-workflow -->
