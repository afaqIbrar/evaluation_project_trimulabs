process.env.path = require ('../config.js');
/**
 * Database postgres require
 */
const {Client} = require('pg');
/**
 * Driver Class
 */
class Driver{
    constructor() {
        this.client = {};
    }

    createConnection() {
        this.client = new Client({
            host: process.env.db_hostname,
            user: process.env.db_userName,
            port: process.env.server_port,
            password: process.env.db_pwd,
            database: process.env.db_database               
        })
        this.client.connect();
    }

    async runquery(queryParameter) {
        const resp = await this.client.query(queryParameter);
        return resp;
    }

    static setInstance(){
        if(!this.instance){
            this.instance = new Driver();
        }
        return this.instance;
    }
}


/**
 * Getter Function to get Instance of Driver
 * @property {Function} getInstance
 * @returns {Object} Instance of driver class
 */
 function getInstance(){
    return Driver.setInstance();
}
module.exports = getInstance;