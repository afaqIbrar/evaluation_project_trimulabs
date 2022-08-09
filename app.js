const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {GraphQLSchema} = require('graphql');
const emplyeeSchema = require("./schemas/employeeSchema");
/**
 * Object initialization for employeeScheema
 */
const schemaObject = new emplyeeSchema();
schemaObject.setRootQueryType();
schemaObject.setRootMutationType();
/**
 * Schema for graphql APIs
 */
const schema = new GraphQLSchema({
    query: schemaObject.rootQueryType,
    mutation: schemaObject.rootMutationType
})


const app = express();
const PORT = 5000;
app.use('/graphql' , graphqlHTTP({
    graphiql: true,
    schema : schema
}));
/**
 * Server Listening at PORT 5000
 */
app.listen(PORT , () => {
    console.log(`App is running on PORT ${PORT}`);
});