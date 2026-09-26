# elliotrylands.com

Next.js (App Router) portfolio. One column, Paco Coursey-style layout.

## Run locally

```bash
npm install
CASE_STUDY_PASSWORD=choose-one npm run dev
```

## Editing

- Homepage copy, the six "Previously" projects and Words posts: `lib/site.ts`
- Styles: `app/globals.css`
- Case study pages: `app/work/[slug]/page.tsx`

## Password-protected case studies

Set `CASE_STUDY_PASSWORD` in Vercel (Project, Settings, Environment Variables). The check runs on the server, so locked case study content is never sent to visitors without the password. Changing the variable logs everyone out.

Keep case study images out of `public/`, since everything in `public/` is readable by anyone who knows the URL.

`/work/*` is excluded from search engines (robots.txt and a noindex header). `public/llms.txt` gives AI tools a plain-text summary.
