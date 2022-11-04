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

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
   
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
    
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateTool(_id: ID!, quantity: Int!): Tool
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;


//may not need. just omit 
// type Order {
//     _id: ID
//     purchaseDate: String
//     products: [Product]
//   }

//  orders: [Order]

// order(_id: ID!): Order

// addToBag(products: [ID]!): Order