/**
 * class query builder
 */
class queryBuilder{
    /**
     * 
     * @param {object} args 
     * @param {string} table 
     * @returns string
     */
    create(args,table) {
        return `INSERT INTO ${table}(
            name, job, department, salary, hire_date)
            VALUES ('${args.name}', '${args.job}', '${args.department}', '${args.salary}', '${args.hire_date}')`
    }
    /**
     * 
     * @param {object} args 
     * @param {string} table 
     * @returns string
     */
    delete(args,table) {
        return `Delete from ${table} where id = ${args.id}`
    }
    /**
     * 
     * @param {object} args 
     * @param {string} table 
     * @returns string
     */
    update(args,table) {
        return `UPDATE ${table} SET  name='${args.name}', job='${args.job}', department='${args.department}', salary=${args.salary}, hire_date='${args.hire_date}' WHERE id = '${args.id}'`;
    }
    /**
     * 
     * @param {string} table 
     * @returns string
     */
    select(table) {
        return `select * from ${table}`;
    }
    /**
     * 
     * @param {object} args 
     * @param {string} table 
     * @returns string
     */
    getRecord(args,table) {
        return `select * from ${table} where name like '%${args.name}%'`;
    }
}
module.exports = queryBuilder;