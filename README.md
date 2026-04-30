# Vaishnav Bengeri Portfolio

A modern animated personal website built as a static GitHub Pages-ready repository.

## Preview locally

Open `index.html` directly in a browser, or run a local server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Customize

1. Open `script.js` and update `SITE_CONFIG.githubUrl` if your GitHub username is not `vaishbengeri`.
2. Edit `index.html` to replace placeholder project descriptions with your real projects.
3. Update the email link in the contact section if you want to use a personal email address.

## Deploy to GitHub Pages

1. Create a new GitHub repository, for example `vaishnav-portfolio`.
2. Upload these files to the repository root.
3. In GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/root`, then save.
6. Your site will be available at `https://YOUR_USERNAME.github.io/REPOSITORY_NAME/`.

For a user site URL like `https://YOUR_USERNAME.github.io/`, name the repository exactly `YOUR_USERNAME.github.io`.

## Files

- `index.html` — website structure and content
- `styles.css` — modern responsive styling and animations
- `script.js` — cursor glow, particle animation, reveal animations, GitHub link config
- `.nojekyll` — tells GitHub Pages to serve the static site as-is
