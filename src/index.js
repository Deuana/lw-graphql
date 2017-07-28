import express from 'express';
import bodyParser from 'body-parser';
import { graphql } from 'graphql';

import config from '~/src/config';
import schema from '~/src/schema';
import { connectDB } from '~/src/db';

connectDB();
const app = express();
app.use(bodyParser.json());

app.post('/graphql', async (req, res) => {
  const { query, variables } = req.body;
  res.send(await graphql(schema, query, null, req, variables));
});

app.listen(config.PORT);
console.warn(`Running a GraphQL API server at localhost:${config.PORT}/graphql`);
