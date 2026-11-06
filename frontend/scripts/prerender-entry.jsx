// Server-side entry for the prerender step: renders one route of the site to HTML.
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Site } from '../src/App';

export function render(path) {
  return renderToString(
    <StaticRouter location={path}>
      <Site />
    </StaticRouter>
  );
}
