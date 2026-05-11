import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');
const angularApp = new AngularNodeAppEngine();

/**
 * Request handler for Angular SSR
 * Handles all requests and renders the Angular application
 */
async function serverHandler(request: any, response: any, next?: any): Promise<void> {
  const angularResponse = await angularApp.handle(request);
  if (angularResponse) {
    writeResponseToNodeResponse(angularResponse, response);
  } else if (next) {
    next();
  }
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(serverHandler);
