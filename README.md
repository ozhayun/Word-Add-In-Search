# Word Search Add-in | Chamelio Assignment

A Microsoft Word Add-in that implements search in the document with specific constraints. Built as part of a technical assessment for Chamelio.

**Tech stack:** React 18, Chakra UI, TypeScript, Word JavaScript API.

---

## Live demo

The add-in is hosted at: **https://chamelio-word-search.netlify.app**  
Test it in **Word Online** by sideloading the provided `manifest.xml`.

---

## How to run

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server (for development and testing)

```bash
npm start
```

- Serves at **http://localhost:3000**. For Word Online, use the live Netlify URL or an HTTPS tunnel (e.g. ngrok).

### 3. Production build

```bash
npm run build
```

Output is in the `dist/` folder.

---

## How to test (Word Online — recommended for reviewers)

1. Open a document in **Word Online** ([office.com](https://www.office.com)).
2. Go to **Insert** → **Add-ins** → **My Add-ins** → **Upload My Add-in**.
3. Select the **manifest.xml** file from the project root (it points to the live Netlify URL).
4. Add text to the document (e.g. the word “Chamelio” several times).
5. In the task pane: enter a search term, optionally check **Case Sensitive**, click **Search**.
6. Confirm: the **Case Sensitive** checkbox filters results correctly, and the list shows **at most 3** matches; if none, “No results found” appears.

**Local run:** Use `npm start` (serves at http://localhost:3000). For Word Online with a local server you need HTTPS (e.g. ngrok); for a quick test, use the live demo above.

---

## Quick test checklist

- [ ] `npm install` and `npm start` run without errors.
- [ ] Add-in appears in Word (Insert → Add-ins / My Add-ins) after sideloading.
- [ ] Task pane opens and shows: search input, “Case Sensitive” checkbox, “Search” button.
- [ ] With text in the document, searching shows up to 3 results.
- [ ] With no matches, “No results found” is shown.
- [ ] Case Sensitive changes which matches are found when casing differs.

---

## Design decisions & assumptions

- **Performance:** Only the **text** of the top 3 results is loaded (not the full result set), to keep the payload small.
- **Separation of concerns:** Word API logic lives in `src/lib/wordSearch.ts`, separate from React UI, for clarity and testability.
- **Deployment:** The add-in is deployed to Netlify so reviewers can sideload over HTTPS without local certificate setup.
- **SPA routing:** A `_redirects` file tells Netlify to serve `taskpane.html` as the entry point, avoiding 404s on refresh.

