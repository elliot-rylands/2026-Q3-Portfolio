# Running locally

This copy is on the `quilo-redesign` branch: the homepage redesign that is not live yet.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

- The homepage is `app/page.tsx`, styled by `app/home.module.css`. All the colours sit at the top of that file.
- Fonts are bundled in `app/fonts`, so nothing loads from Google. Helvetica Neue comes from macOS.
- The Jane case study stays locked unless you add `CASE_STUDY_PASSWORD=...` to a `.env.local` file. That file is ignored by git.
- `git push` on this branch makes a Vercel preview, and merging into `main` puts it live. Neither happens unless you do it.
