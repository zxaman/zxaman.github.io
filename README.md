# Greeting Card Name Editor

This project is ready for GitHub Pages deployment.

## Deploy to GitHub Pages (Free)

1. Create a new **public** repository on GitHub (for example: `greeting-card`).
2. In this folder, run:

```powershell
git add .
git commit -m "Prepare greeting card app"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

3. Open your repository on GitHub.
4. Go to **Settings -> Pages**.
5. In **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/(root)**
6. Click **Save**.

Your live link will be:

`https://<your-username>.github.io/<your-repo>/`

## Notes

- Keep these files in repo root: `index.html`, `style.css`, `script.js`, `card-image-data.js`, `Frame 4.png`.
- If you replace `Frame 4.png`, regenerate `card-image-data.js` before deploy.
