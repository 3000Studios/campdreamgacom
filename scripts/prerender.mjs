import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { prerenderRoutePaths, renderRouteForPrerender } from '../build/prerender/prerender.js';

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDirectory = path.join(rootDirectory, 'dist');
const templatePath = path.join(distDirectory, 'index.html');

const replaceRootContent = (template, body) => {
  const rootStartMarker = '<div id="root">';
  const rootStart = template.indexOf(rootStartMarker);
  const bodyEnd = template.indexOf('</body>', rootStart);
  const rootEnd = template.lastIndexOf('</div>', bodyEnd);

  if (rootStart === -1 || bodyEnd === -1 || rootEnd === -1) {
    throw new Error('Could not locate the Vite root element in dist/index.html.');
  }

  return template.slice(0, rootStart + rootStartMarker.length) + body + template.slice(rootEnd);
};

const replaceTitle = (template, helmetTitle) => {
  if (!helmetTitle) return template;
  return template.replace(/<title>[\s\S]*?<\/title>/, helmetTitle);
};

const removeTemplateDescription = (template) =>
  template.replace(/\s*<meta\s+name="description"[\s\S]*?\/>/, '');

const buildRouteHtml = (template, routePath) => {
  const { body, helmet } = renderRouteForPrerender(routePath);
  const helmetHead = [
    helmet.priority.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ]
    .filter(Boolean)
    .join('\n    ');

  let html = replaceTitle(template, helmet.title.toString());
  html = removeTemplateDescription(html);
  html = html.replace('</head>', `    ${helmetHead}\n  </head>`);
  return replaceRootContent(html, body);
};

const template = await readFile(templatePath, 'utf8');

for (const routePath of prerenderRoutePaths) {
  const html = buildRouteHtml(template, routePath);
  const outputPath =
    routePath === '/'
      ? templatePath
      : path.join(distDirectory, routePath.replace(/^\//, ''), 'index.html');

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, 'utf8');
  console.log(`Prerendered ${routePath} -> ${path.relative(rootDirectory, outputPath)}`);
}
