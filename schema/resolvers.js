const { UserList, MovieList } = require("../FakeData");
const _ = require("lodash");

const resolvers = {

  Query: {

    // USER RESOLVERS
    users: () => UserList,
    user: (parent, args) => _.find(UserList, { id: Number(args.id) }),

    // MOVIE RESOLVERS
    movies: () => MovieList,
    movie: (parent, args) => _.find(MovieList, { name: args.name }),
  },

  User: {
    favoriteMovies: () => {
      return _.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },

  Mutation: {

    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input;
      let userUpdated;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          userUpdated = user;
        }
      });

      return userUpdated;
    },

    deleteUser: (parent, args) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      return null;
    }

  },
};

module.exports = { resolvers };
