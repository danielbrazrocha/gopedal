const bcrypt = require('bcrypt')
const hash = bcrypt.hashSync('123456', 10)
console.log(bcrypt.compareSync('123456', hash))
