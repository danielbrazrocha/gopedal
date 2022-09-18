const models = require('./src/models')
const User = models.User
const User_Address = models.User_Address
const User_Payment = models.User_Payment
const Product = models.Product
const Inventory = models.Inventory
const Category = models.Category
const Discount = models.Discount




const run = async () => {
  Product.findByPk(1)
.then((company) => {
  // Get the Company with Users (employes) datas included
  console.log(company)
  // Get the Users (employes) records only
  // console.log(company.get().employes)
})
.catch((err) => {
  console.log("Error while find company : ", err)
})

};

// models.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//   // run();
// });

// how to find aggregating other table
// Product.findByPk(1, {include: ['inventory']})

Product.findByPk(1)
.then((element) => {
  // Get the Company with Users (employes) datas included
  console.log(element)
  // Get the Users (employes) records only
  // console.log(company.get().employes)
})
.catch((err) => {
  console.log("Error while find company : ", err)
})