const express = require('express');
const cors = require('cors');
const { graphqlExpress, graphiqlExpress} = require('graphql-server-express');
const bodyParser = require('body-parser')
const schema  =  require('./src/graphql/schema');

const PORT = 3000;
const app = express();

app.use('*', cors({origin: 'http://localhost:3000'}));

app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema
}));

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

app.listen(PORT, () =>
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`)
);