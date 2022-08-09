class queryBuilder{
    create(args,table) {
        return `INSERT INTO ${table}(
            name, job, department, salary, hire_date)
            VALUES ('${args.name}', '${args.job}', '${args.department}', '${args.salary}', '${args.hire_date}')`
    }
    delete(args,table) {
        return `Delete from ${table} where id = ${args.id}`
    }
    update(args,table) {
        return `UPDATE ${table} SET  name='${args.name}', job='${args.job}', department='${args.department}', salary=${args.salary}, hire_date='${args.hire_date}' WHERE id = '${args.id}'`;
    }
    select(table) {
        return `select * from ${table}`;
    }
    getRecord(args,table) {
        return `select * from ${table} where name like '%${args.name}%'`;
    }
}
module.exports = queryBuilder;