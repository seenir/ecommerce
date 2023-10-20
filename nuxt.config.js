"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    serverMiddleware: ['~/api/getData.js', '~/api/deleteData.js'],
    nitro: {
        preset: 'vercel-edge',
    },
    http: {
        baseURL: 'http://localhost:3000' // Adjust to your API's base URL
      },
      toast: {
        position: 'top-right',
        duration: 3000,
      }
};
