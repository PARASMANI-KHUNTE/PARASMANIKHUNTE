import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute("dist/index.html"), "utf-8");
const { render } = await import("./dist-ssr/entry-server.js");

// Authoritative routes to prerender
const routesToPrerender = [
  "/",
  "/projects",
  "/projects/zuvo",
  "/projects/kimiko",
  "/projects/mycircle",
  "/projects/whiteboard",
  "/experience",
  "/education",
  "/skills"
];

console.log("⚡ Pre-rendering routes for crawlers and SEO...");

for (const url of routesToPrerender) {
  try {
    const appHtml = render(url);
    const html = template.replace("<!--app-html-->", appHtml);

    let filePath;
    if (url === "/") {
      filePath = toAbsolute("dist/index.html");
    } else {
      const dirPath = toAbsolute(`dist${url}`);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      filePath = path.join(dirPath, "index.html");
    }

    fs.writeFileSync(filePath, html);
    console.log(`✓ Prerendered ${url} -> ${filePath}`);
  } catch (err) {
    console.error(`✗ Error prerendering ${url}:`, err);
  }
}

console.log("✅ Static pre-rendering completed successfully!");
