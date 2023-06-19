const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const axios = require('axios');

const app = express();
let message = "this is message"
const schema = buildSchema(`
type Post {
    userId: Int
    id: Int
    title: String
    body:String
}
  
type User{
    name: String
    age: Int
    college: String
}

type Query {
    hello: String!
    welcomemsg(name: String, dayofweek: String!): String
    getUser: User
    getUsers: [User]
    getPostsFromExternalApi: [Post]
    message: String
}

type Mutation{
    setMessage(newMessage: String): String
    createUser(name: String!, age: Int, college: String!): User
}


`);

const root = {
  hello: () => {
    return 'helloworld';
  },
  welcomemsg: args =>{
    console.log(args);
    return `hey ${args.name},how are you, today is ${args.dayofweek}`;
  },
  getUser: () => {
    const User = {
        name: 'ddd',
        age: 222,
        college: 'uce'
    }
    return User;
  },
  getUsers: () => {
    const User = [{
        name: 'bbb',
        age: 252,
        college: 'ucek'
    },
     {
        name: 'aaa',
        age: 12,
        college: 'ucet'
    }];
    return User;
  },
  getPostsFromExternalApi: async ()=>{
    const result = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
    );
    return result.data
//    return axios.get('https://jsonplaceholder.typicode.com/posts')
//     .then(result=>result.data);
  },
  setMessage: ({newMessage}) => {
    message = newMessage
    return message
  },
  message: ()=> message,
  createUser:( {name, age,college})=> {

    return {name, age,college}

  }
};

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema,
  rootValue: root,
}));

app.listen(3000, () => {
  console.log("Running on port 3000");
});
