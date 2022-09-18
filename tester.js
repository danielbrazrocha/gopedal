const models = require('./src/models')
const User = models.User
const User_Address = models.User_Address
const User_Payment = models.User_Payment
const Product = models.Product
const Inventory = models.Inventory
const Category = models.Category
const Discount = models.Discount
const Shopping_Session = models.Shopping_Session
const Payment_Details = models.Payment_Details
const Order_Details = models.Order_Details




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

Order_Details.findByPk(1, {include: ['user']})
.then((element) => {
  // Get the Company with Users (employes) datas included
  console.log(element)
  // Get the Users (employes) records only
  // console.log(company.get().employes)
})
.catch((err) => {
  console.log("Error while find company : ", err)
})

// Shopping_Session.create({
//   UserId: 3,
//   total: 0,
//   createdAt: new Date(),
//   updatedAt: new Date()
// })
// .then((newCompany) => {
//   // The get() function allows you to recover only the DataValues of the object
//   console.log(newCompany.get())
// })
// .catch((err) => {
//   console.log("Error while company creation : ", err)
// })

// Product.create({
//   CategoryId: 2,
//   // DiscountId: 1,
//   InventoryId: 2,
//   name: 'Pedal Clip MTB PD-M324 (Prata) - Shimano',
//   description: 'Pedal clip para bicicleta MTB, marca Shimano, modelo PD-M324, cor Prata. Especificação:- Marca: Shimano - Modelo: PD-M324- Código Shimano: EPDM324 - Cor: Prata- Rosca: Grossa tipo Inglês 9/16"- Acompanha par de taquinho: SM-SH56- Sistema misto, sendo um lado com clip e o outro com apoio normal (sem clip)- Peso: 533 gramas (par)- Produto original.',
//   image: '/assets/products/001-PedalClip.jpg',
//   SKU: '1111',
//   price: 520.00,
//   createdAt: new Date(),
//   updatedAt: new Date()
// })
// .then((newCompany) => {
//   // The get() function allows you to recover only the DataValues of the object
//   console.log(newCompany.get())
// })
// .catch((err) => {
//   console.log("Error while company creation : ", err)
// })