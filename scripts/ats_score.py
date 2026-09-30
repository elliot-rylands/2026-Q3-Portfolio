#!/usr/bin/env python3
"""Recruiter / ATS readability score for a portfolio site.

Fetches the rendered HTML of the home page, every linked case study and the
words index, then scores what a parser or a skimming recruiter can actually
extract as text. No dependencies beyond the standard library.

Usage:
  python ats_score.py http://localhost:3000 [--cookie "er_access=..."] [--json out.json]

This is a readability checklist, not a real ATS: no vendor score exists for a
portfolio site, and the result should never be described as one.
"""
import argparse, json, re, sys, urllib.request
from html.parser import HTMLParser

SKILLS = {
    "product designer": r"product design(er)?",
    "design engineer": r"design engineer",
    "user research": r"user research|usability (test|session)s?|interviews?",
    "interaction design": r"interaction design|interaction|flows?",
    "prototyping": r"prototyp",
    "design systems": r"design system",
    "accessibility": r"accessib",
    "information architecture": r"information architecture",
    "Figma": r"\bfigma\b",
    "React": r"\breact\b",
    "TypeScript": r"typescript",
    "Next.js": r"next\.?js",
    "experimentation / A/B": r"a/b test|experiment",
    "analytics": r"analytics|\bga4\b|heap|hotjar",
    "product strategy": r"strategy|strategic",
    "stakeholders / leadership": r"stakeholder|led the|leading|mentor",
}

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ""; self.meta = {}; self.h1 = []; self.h2 = []; self.links = []
        self.imgs = []; self.text = []; self.lang = None; self.jsonld = []
        self._stack = []; self._skip = 0; self._buf = None
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html": self.lang = a.get("lang")
        if tag in ("script", "style", "noscript"):
            self._skip += 1
            if tag == "script" and a.get("type") == "application/ld+json": self._buf = []
        if tag == "meta":
            k = a.get("name") or a.get("property")
            if k: self.meta[k] = a.get("content", "")
        if tag == "a" and a.get("href"): self.links.append(a["href"])
        if tag == "img": self.imgs.append(a.get("alt"))
        if tag in ("title", "h1", "h2"): self._stack.append([tag, ""])
    def handle_endtag(self, tag):
        if tag in ("script", "style", "noscript"):
            self._skip = max(0, self._skip - 1)
            if self._buf is not None:
                try: self.jsonld.append(json.loads("".join(self._buf)))
                except Exception: pass
                self._buf = None
        if self._stack and self._stack[-1][0] == tag:
            t, s = self._stack.pop(); s = " ".join(s.split())
            if t == "title": self.title = s
            elif t == "h1": self.h1.append(s)
            elif t == "h2": self.h2.append(s)
    def handle_data(self, d):
        if self._buf is not None: self._buf.append(d); return
        if self._skip: return
        for item in self._stack: item[1] += d
        self.text.append(d)
    @property
    def body(self): return " ".join(" ".join(self.text).split())

def fetch(url, cookie=None):
    req = urllib.request.Request(url, headers={"User-Agent": "portfolio-ats-check", **({"Cookie": cookie} if cookie else {})})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception as e:
        return 0, str(e)

def parse(html):
    p = Page(); p.feed(html); return p

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("base"); ap.add_argument("--cookie"); ap.add_argument("--json")
    args = ap.parse_args(); base = args.base.rstrip("/")
    checks = []  # (category, name, points_possible, points_earned, detail, fix)
    def add(cat, name, possible, ok, detail, fix=""):
        earned = possible if ok is True else (0 if ok is False else round(possible * ok, 1))
        checks.append({"category": cat, "check": name, "possible": possible, "earned": earned, "detail": detail, "fix": "" if earned == possible else fix})

    st, html = fetch(base + "/", args.cookie)
    if st != 200:
        print(json.dumps({"error": f"Home page returned {st}", "detail": html[:200]})); sys.exit(1)
    home = parse(html); ht = home.body; low = ht.lower()

    # 1. Identity and contact (20)
    add("Identity", "Name in the page title and H1", 5, bool(home.h1) and "rylands" in (home.title + " ".join(home.h1)).lower(),
        f"title: {home.title!r}; h1: {home.h1}", "Put your full name in the <title> and the page's H1.")
    add("Identity", "Standard job title as plain text", 5, bool(re.search(r"product designer", low)),
        "Looks for the exact phrase 'product designer'", "Say 'product designer' in the intro, not only 'design engineer'.")
    add("Identity", "Location as text", 3, bool(re.search(r"cochrane|calgary|alberta|canada", low)), "", "Name your city or region in text.")
    add("Identity", "Email, LinkedIn and GitHub as real links", 4,
        sum(any(k in l for l in home.links) for k in ("mailto:", "linkedin.com", "github.com")) / 3,
        "Parsers pick up hrefs, not icons.", "Link email, LinkedIn and GitHub as text links.")
    add("Identity", "Current employer stated", 3, bool(re.search(r"currently[^.]{0,80}(at|with)", low)), "", "Say where you work now in a sentence.")

    # Discover case studies
    work = sorted({l.split("#")[0] for l in home.links if l.startswith("/work/") and "/media/" not in l})
    pages = {}
    for w in work:
        s, h = fetch(base + w, args.cookie); pages[w] = (s, parse(h) if s == 200 else None)
    # Pages behind a password on purpose are reported, not penalised.
    locked = [k for k, v in pages.items() if v[1] is not None and "password protected" in v[1].body.lower()]
    readable = {k: v[1] for k, v in pages.items() if v[1] is not None and k not in locked and len(v[1].body) > 1500}
    short = [k for k, v in pages.items() if k not in locked and k not in readable]

    # 2. Work history (20)
    open_work = [w for w in work if w not in locked]
    add("Work history", "Case studies readable as text", 6, (len(readable) / len(open_work)) if open_work else False,
        f"{len(readable)} of {len(open_work)} readable; too short: {short}; locked on purpose: {locked}", "Keep each study's story in HTML text, not only in images.")
    has_role = [k for k, p in readable.items() if re.search(r"\brole\b", p.body.lower())]
    has_when = [k for k, p in readable.items() if re.search(r"\b(19|20)\d\d\b", p.body)]
    add("Work history", "Each study states your role", 5, (len(has_role) / len(readable)) if readable else False,
        f"missing: {sorted(set(readable) - set(has_role))}", "Add a Role line to every study.")
    add("Work history", "Each study has dates", 5, (len(has_when) / len(readable)) if readable else False,
        f"missing: {sorted(set(readable) - set(has_when))}", "Add a When line (month and year) to every study.")
    add("Work history", "Previous employers named on the home page", 4, len(work) >= 3, f"{len(work)} projects linked", "")

    # 3. Skills coverage (25)
    corpus = (ht + " " + " ".join(p.body for p in readable.values())).lower()
    found = {k: bool(re.search(v, corpus)) for k, v in SKILLS.items()}
    missing = [k for k, v in found.items() if not v]
    add("Skills", "Core skills and tools mentioned in context", 25, sum(found.values()) / len(found),
        f"missing: {missing}", "Mention the missing ones where the work genuinely shows them. Never add a skill you can't back up.")

    # 4. Structure and access (15)
    all_pages = {"/": home, **readable}
    one_h1 = [k for k, p in all_pages.items() if len(p.h1) == 1]
    add("Structure", "Exactly one H1 per page", 4, len(one_h1) / len(all_pages), f"off: {sorted(set(all_pages) - set(one_h1))}", "One H1 per page.")
    add("Structure", "Section headings (H2) on case studies", 3, (sum(1 for p in readable.values() if len(p.h2) >= 3) / len(readable)) if readable else False, "", "Break studies into titled sections.")
    # alt="" marks decorative images (logos beside a name) and is correct; only a missing alt fails.
    alts = [a for p in all_pages.values() for a in p.imgs]
    good_alt = [a for a in alts if a is not None]
    add("Structure", "Every image has alt text (empty only if decorative)", 4, (len(good_alt) / len(alts)) if alts else True, f"{len(good_alt)}/{len(alts)} have alt", "Add alt text to the images missing it.")
    add("Structure", "Page language set", 2, bool(home.lang), f"lang={home.lang}", "Set <html lang>.")
    add("Structure", "Plain-text contact path for access", 2, bool(re.search(r"email me|contact|get in touch", low)), "", "")

    # 5. Metadata (20)
    add("Metadata", "Home meta description names role and focus", 4,
        bool(re.search(r"design", home.meta.get("description", "").lower())), home.meta.get("description", "")[:120], "Write a meta description with your role.")
    person = next((j for j in home.jsonld if isinstance(j, dict) and j.get("@type") == "Person"), None)
    add("Metadata", "Person structured data with job title", 4, bool(person and person.get("jobTitle")),
        f"jobTitle: {person.get('jobTitle') if person else None}", "Add schema.org Person JSON-LD with jobTitle.")
    descs = [p.meta.get("description") for p in readable.values()]
    add("Metadata", "Unique description on each case study", 4, (len(set(filter(None, descs))) / len(readable)) if readable else False, "", "Give each study its own meta description.")
    add("Metadata", "Open Graph title and description", 3, bool(home.meta.get("og:title") and home.meta.get("og:description")), "", "Add OG tags so shared links preview well.")
    s_sm, sm = fetch(base + "/sitemap.xml")
    add("Metadata", "sitemap.xml served", 3, s_sm == 200 and "<urlset" in sm, f"status {s_sm}", "Serve a sitemap.xml.")
    s_rb, rb = fetch(base + "/robots.txt")
    add("Metadata", "robots.txt served", 2, s_rb == 200, f"status {s_rb}", "Serve robots.txt.")

    total = round(sum(c["earned"] for c in checks)); possible = sum(c["possible"] for c in checks)
    cats = {}
    for c in checks:
        d = cats.setdefault(c["category"], [0, 0]); d[0] += c["earned"]; d[1] += c["possible"]
    out = {"score": total, "out_of": possible, "categories": {k: [round(v[0], 1), v[1]] for k, v in cats.items()},
           "pages_checked": ["/"] + list(readable), "locked_on_purpose": locked, "too_short": short, "checks": checks,
           "note": "Recruiter and parser readability checklist. Not a vendor ATS score."}
    s = json.dumps(out, indent=2)
    if args.json: open(args.json, "w").write(s)
    print(s)

if __name__ == "__main__":
    main()
