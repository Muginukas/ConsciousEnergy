<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:deployment-workflow -->
# Deployment workflow (preview → approve → merge)

The production branch is `claude/consciousenergy-project-plan-bBHmO`, deployed to
https://consciousenergy.vercel.app via Vercel's GitHub integration. Do NOT push
or merge directly to it. For every change, follow this flow so the user can
review a live preview on their phone before anything ships:

1. Develop on a feature branch and push it.
2. Open a pull request targeting the production branch. Vercel automatically
   builds a preview deployment and posts its URL as a PR comment.
3. Subscribe to the PR's activity (`subscribe_pr_activity`). When the Vercel
   preview comment arrives (or checks go green), send the preview URL to the
   user proactively (`SendUserFile`/message with status `proactive`) so it
   pushes to their phone, with a one-line summary of what changed.
4. Wait for the user's approval. Do NOT merge without it.
5. Once the user approves, merge the PR into the production branch — this
   triggers the Vercel production deploy. Then confirm the production URL is live.

The user's approval is the gate before every merge; never auto-merge. The phone
notification depends on push notifications being enabled in the Claude mobile app.
<!-- END:deployment-workflow -->
