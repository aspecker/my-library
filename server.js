const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query{
      user(id: Int!): Person
      users(gender: String): [Person]
  },
  type Person{
      id: Int,
      name: String,
      age: Int,
      gender: String
  }
`);

const users = [
    {
    id: 1,
    name: 'Brian',
    age: '21',
    gender: 'M'
  },
  {
    id:2,
    name: 'Kim',
    age: '22',
    gender: 'M'
  },
  {
    id:3,
    name: 'Joseph',
    age: '23',
    gender: 'M'
  },
  {
    id:3,
    name: 'Faith',
    age: '23',
    gender: 'F'
  },
  {
    id:5,
    name: 'Joy',
    age: '25',
    gender: 'F'
  }
];

const getUser = (args) => {
    const userID = args.id;
    return users.filter(user=> user.id ===  userID)[0]
}

const retrieveUsers = (args) => {
    if (args.gender){
        const { gender } = args;
        return users.filter(user=> user.gender===gender)
    }
        return users;
}

const root = {
    user: getUser,
    users: retrieveUsers
};

const app = express();
app.use(`/graphql`, graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));

const PORT = 3000;
app.listen(PORT, ()=> console.log(`Now browse to localhost ${PORT}/graphql`))