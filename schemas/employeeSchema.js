const queryBuilder = require("../core/querybuilder");
/**
 * Object initialization for queryBuilder
 */
const query = new queryBuilder();
/**
 * DB Object
 */
const db = require("../core/db")();
db.createConnection();
const {GraphQLObjectType,GraphQLNonNull,GraphQLInt,GraphQLString,GraphQLList,GraphQLSchema} = require('graphql');
/**
 * Employee Schema class
 */
class EmployeeSchema {
    constructor () {
        this.employee = new GraphQLObjectType({
            name: 'Employee',
            description: 'This represents the employee object',
            fields: () => ({
                id: {type:GraphQLNonNull(GraphQLInt)},
                name: {type:GraphQLNonNull(GraphQLString)},
                job: {type:GraphQLNonNull(GraphQLString)},
                department: {type:GraphQLNonNull(GraphQLString)},
                salary: {type:GraphQLNonNull(GraphQLInt)},
                hire_date: {type:GraphQLNonNull(GraphQLString)},
            })
        });
        this.rootQueryType;
        this.rootMutationType;
    }

    /**
     * Function to set the Queries related to the Object
     */
    setRootQueryType () {
        const RootQueryType = new GraphQLObjectType({
            name : 'Query',
            description: 'Root Query',
            fields: () => ({
                /**
                 * To get All the employees
                 */
                getAllEmployees: {
                    type: new GraphQLList(this.employee),
                    description : 'List of all Employees',
                    resolve: async () => {
                        const resp = await db.runquery(query.select('employee'));
                        return resp.rows
                    }
                },
                /**
                 * To get All the employees
                 */
                getEmployeeRecord: {
                    type: this.employee,
                    description: "Get Employee Based on name",
                    args: {
                        name : {type:GraphQLString}
                    },
                    resolve: async (parent , args) => {
                        const resp = await db.runquery(query.getRecord(args,'employee'))
                        return resp.rows[0]
                    }
                }
            })
        });
        this.rootQueryType = RootQueryType;
    }
    /**
     * Function to set the Mutation Queries for employee
     */
    setRootMutationType() {
        const RootMutationType =  new GraphQLObjectType({
            name: 'Mutation',
            description: 'Root Mutation',
            fields: () => ({
                /**
                 * To add an employee in the table
                 */
                addEmployee: {
                    type: GraphQLString,
                    description: "Add a new Employee",
                    args: {
                        name:{type:GraphQLNonNull(GraphQLString)},
                        job:{type:GraphQLNonNull(GraphQLString)},
                        department:{type:GraphQLNonNull(GraphQLString)},
                        salary:{type:GraphQLNonNull(GraphQLInt)},
                        hire_date:{type:GraphQLNonNull(GraphQLString)}
                    },
                    resolve:async (parent , args) => {
                        const resp = await db.runquery(query.create(args,'employee'));
                        if(resp.rowCount > 0) {
                            return 'Record Added Successfully';
                        } else if (rowCount <= 0){
                            throw new UserInputError('Invalid argument value');
                        }
                    }
                },
                /**
                 * To delete an employee with the id 
                 */
                deleteEmployee: {
                    type: GraphQLString,
                    description: "Delete an Employee",
                    args: {
                        id:{type:GraphQLNonNull(GraphQLInt)},
                    },
                    resolve:async (parent,args) => {
                        const resp = await db.runquery(query.delete(args,'employee'));
                        if(resp.rowCount > 0) {
                            return `Record with id = ${args.id} is deleted Successfully`;
                        } else if(resp.rowCount <= 0) {
                            return `Record with id = ${args.id} is either deleted already or not exist`;
                        }
                    } 
                },
                /**
                 * To update an employee based on id
                 */
                updateEmployee: {
                    type: GraphQLString,
                    description: "Update the Employee",
                    args: {
                        id:{type:GraphQLNonNull(GraphQLInt)},
                        name:{type:GraphQLNonNull(GraphQLString)},
                        job:{type:GraphQLNonNull(GraphQLString)},
                        department:{type:GraphQLNonNull(GraphQLString)},
                        salary:{type:GraphQLNonNull(GraphQLInt)},
                        hire_date:{type:GraphQLNonNull(GraphQLString)}
                    },
                    resolve:async (parent,args) => {
                       const resp = await db.runquery(query.update(args,'employee'));
                        if(resp.rowCount > 0) {
                            return `Record with id = ${args.id} is updated Successfully`;
                        } else if(resp.rowCount <= 0) {
                            return `Record with id = ${args.id} is either deleted already or not exist`;
                        }
                    }
                }
            })
        })
        this.rootMutationType = RootMutationType;
    }
}
module.exports = EmployeeSchema;