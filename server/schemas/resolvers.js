const { AuthenticationError } = require('apollo-server-express');
const { User, Tool, Category, Saved } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    tools: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Tool.find(params).populate('category');
    },
    tool: async (parent, { _id }) => {
      return await Tool.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'saved.tools',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.savedDate - a.savedDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    saved: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'saved.tools',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addSaved: async (parent, { tools }, context) => {
      console.log(context);
      if (context.user) {
        const saved = new Saved({ tools });

        await User.findByIdAndUpdate(context.user._id, { $push: { saved: saved } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateTool: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Tool.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
