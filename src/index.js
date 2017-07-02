import express from 'express';
import bodyParser from 'body-parser';

import config from '~/src/config';

const app = express();
app.use(bodyParser.json());

app.post('/graphql', (_, res) => {
  res.send('Hello!');
});

app.listen(config.PORT);
console.warn(`Running a GraphQL API server at localhost:${config.PORT}/graphql`);
