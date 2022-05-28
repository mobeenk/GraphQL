const {ApolloServer , gql} = require('apollo-server');
const { MockList } = require('@graphql-tools/mock');
//SCHEMA CREATION
const typeDefs = gql`
    scalar Date

    """
    An Object that describes the charachteristics of a ski day
    """
    type SkiDay{
        "A ski day's unique identifier"
       id: ID!
       "the date occured"
       date: Date!
       "the mountain name"
       mountain: String!
    }

    enum Condition {
        POWDER
        SLUSH
        DRY
        WET
    }

    type Query {
        totalDays: Int!
        allDays: [SkiDay!]!
    }

    input AddDayInput{
        date: Date!
        mountain: String!
        powder: Condition!
    }

    type RemoveDayPayLoad { 
        day: SkiDay!
        removed: Boolean
        totalBefore: Int
        totalAfter: Int
    }
    
    type Mutation {
        addDay(input: AddDayInput!): SkiDay!
        removeDay(id: ID!): RemoveDayPayLoad!
    }

    type Subscription {
        newDay: SkiDay!
    }

    `;
    //this forces these two types to return fixed data
    const mocks = {
        Date: () => "1/2/2020",
        String: () => "fixed striung",
        Query: () => ({
            allDays: () => new MockList(8)
        }) 
    };



const server = new ApolloServer({
    typeDefs,
    mocks
});


server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});