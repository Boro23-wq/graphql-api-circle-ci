2;
3;
4;
5;
6;
7;
8;
9;
10;
11;
12;
13;
14;
15;
16;
17;
18;
19;
20;
21;
22;
23;
24;
25;
26;
27;
/* src/schema.js */

const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        users: [User!]!,
        user(id: Int!): User!
    }
 
    type User {
        id: ID!
        name: String!
        email: String
        posts: [Post!]
    }
 
    type Post {
        id: ID!
        title: String!
        published: Boolean!
        link: String
        author: User!
    }
`);

module.exports = schema;
