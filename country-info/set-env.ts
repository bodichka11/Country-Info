/* eslint-disable @typescript-eslint/no-require-imports */
const { writeFileSync } = require('fs');
const { config } = require('dotenv');

config();

const targetPath = './src/environments/environment.ts';

const envConfigFile = `
export const environment = {
  production: false,
  apiBaseUrl: '${process.env['API_URL']}',
};
`;

writeFileSync(targetPath, envConfigFile);
console.log(`✅ Environment file generated at ${targetPath}`);
