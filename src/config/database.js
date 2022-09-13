
const config = {
  username: process.env.MYSQLDB_USER || 'root',
  password: process.env.MYSQLDB_ROOT_PASSWORD || 'root',
  database: process.env.NODE_ENV === 'test' ? 'go_pedal_test' : 'go_pedal',
  host: process.env.MYSQLDB_HOST || 'localhost',
  dialect: 'mysql'
}

console.log(config)

module.exports = config
