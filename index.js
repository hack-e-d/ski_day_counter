const { ApolloServer, MockList , gql } = require("apollo-server");

const typeDefs = gql `
# Custom scalar created to represent date and defined in the resolver function
    scalar Date 

# Discription of the Schema is defined
    """
    An Object that describes the characteristics of a SkiDay
    """
    type SkiDay {
        "SkiDay ID"
        id: ID!
        "Date of the Ski"
        date: Date!
        "Location of the Ski"
        mountain: String!
        "Shape of the snow"
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

    input AddDayInput {
        date: Date!
        mountain: String!
        conditions: Conditions
    }

    type RemoveDayPayload {
        day: SkiDay!
        removed: Boolean
        totalBefore: Int
        totalAfter: Int
    }

    type Mutation {
        addDay(input: AddDayInput!) : SkiDay!
        removeDay(id:ID!): RemoveDayPayload!
    }

    type Subscription {
        newDay: SkiDay!
    }
`;

// Creating custom mock
const mocks = {
    Date: () => "1/2/2025",
    String: () => "Cool data",
    Query: () => ({
        allDays: () => new MockList([0,3])
    }),
    Subscription: () => ({
        newDay: () => new MockList(2)
    })
}

const server = new ApolloServer({
    typeDefs,
    mocks
});

server.listen().then(({ url }) => {
    console.log('server running at ' + url)
})