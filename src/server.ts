/* eslint-disable no-console */

import express from 'express';
import { router } from 'routes';

const app = express();
app.use(express.json());

app.use(router);

app.listen('9999', () => console.log('Server running!'));
