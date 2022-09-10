
const config = {
  username: process.env.MYSQLDB_USER || 'root',
  password: process.env.MYSQLDB_ROOT_PASSWORD || 'root',
  database: process.env.MYSQLDB_DATABASE || 'go_pedal',
  host: process.env.MYSQLDB_HOST || 'localhost',
  dialect: 'mysql'
}

console.log(config)

module.exports = config
