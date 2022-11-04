const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Tool {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    category: Category
  }

  type Saved {
    _id: ID
    savedDate: String
    tools: [Tool]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    saved: [Saved]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    tools(category: ID, name: String): [Tool]
    tool(_id: ID!): Tool
    user: User
    saved(_id: ID!): Saved
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addSaved(tools: [ID]!): Saved
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateTool(_id: ID!, quantity: Int!): Tool
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;

