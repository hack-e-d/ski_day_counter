const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql `
    type SkiDay {
        id: ID!
        date: String!
        mountain: String!
        conditions: Conditions
    }

    enum Conditions {
        POWDER
        HEAVY
        ICE
    }
    type Query {
        totalDays: Int!
        allDays: [SkiDay!]!
        test: Int!
    }
`;

const server = new ApolloServer({
    typeDefs,
    mocks: true
});

server.listen().then(({ url }) => {
    console.log('server running at ' + url)
})