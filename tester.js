/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const models = require('./src/models')
const { QueryTypes } = require('sequelize')
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
const Cart_Item = models.Cart_Item
const Order_Itens = models.Order_Itens

// const run = async () => {
//   Order_Itens.findByPk(1)
//   // models.sequelize.query("SELECT p.* FROM Product p, Order_Itens oi, Order_Details od, User u WHERE p.id = oi.ProductId AND oi.OrderDetailsId = od.id AND od.UserId = u.id")

//   .then((element) => {
//     // Get the Company with Users (employes) datas included
//     console.log(element)
//     // Get the Users (employes) records only
//     // console.log(company.get().employes)
//   })
//   .catch((err) => {
//     console.log("Error while find company : ", err)
//   })

// };

// models.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//   // run();
// });

// how to find aggregating other table
// Product.findByPk(1, {include: ['inventory']})

// Order_Details.findByPk(1, {include: ['user', 'payment_details', 'orderitens']})
// // models.sequelize.query("SELECT p.* FROM Product p, Order_Itens oi, Order_Details od, User u WHERE p.id = oi.ProductId AND oi.OrderDetailsId = od.id AND od.UserId = u.id")

// .then((element) => {
//   // Get the Company with Users (employes) datas included
//   console.log(element)
//   // Get the Users (employes) records only
//   // console.log(company.get().employes)
// })
// .catch((err) => {
//   console.log("Error while find company : ", err)
// })

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

// // Query to find all Products from a Shopping Cart
// models.sequelize.query("SELECT p.* FROM Product p, Cart_Item c, Shopping_Session s , User u WHERE p.id = c.ProductId AND c.ShoppingSessionId = s.id AND s.id = u.id")

// .then((element) => {
//   // Get the Company with Users (employes) datas included
//   // using [0] because MySQL metadata
//   console.log(element[0])
//   // Get the Users (employes) records only
//   // console.log(company.get().employes)
// })
// .catch((err) => {
//   console.log("Error while find company : ", err)
// })

// // Query to find all Products from a Order
// models.sequelize.query("SELECT p.* FROM Product p, Order_Itens oi, Order_Details od, User u WHERE p.id = oi.ProductId AND oi.OrderDetailsId = od.id AND od.UserId = u.id")
// .then((element) => {
//   // Get the Company with Users (employes) datas included
//   console.log(element)
//   // Get the Users (employes) records only
//   // console.log(company.get().employes)
// })
// .catch((err) => {
//   console.log("Error while find company : ", err)
// })
// })

// Shopping_Session.update({
//   total: 1700,
//   updatedAt: new Date().toISOString()
// }, {
//   where: {
//     id: 1
//   }
// })
//   .then((newCompany) => {
//   // The get() function allows you to recover only the DataValues of the object
//     console.log(newCompany)
//   })
//   .catch((err) => {
//     console.log('Error while company creation : ', err)
//   })

const ProductPrices = {
  1: 'price_1LkYOaCt7XDWH8ggMjo9akCP',
  2: 'price_1LkZuACt7XDWH8ggFasB6IML',
  3: 'price_1LkZvHCt7XDWH8ggVEBafy3L',
  4: 'price_1LkZvxCt7XDWH8ggixClZhOy',
  5: 'price_1LkZwdCt7XDWH8ggWydsxBli',
  6: 'price_1LkZxCCt7XDWH8gggN8X0kG0',
  7: 'price_1LkZxwCt7XDWH8ggTNn4FKqR',
  8: 'price_1LkZyYCt7XDWH8ggxu5Cg3L5',
  9: 'price_1LkZz2Ct7XDWH8gggv7ZXNDQ',
  10: 'price_1LkZzeCt7XDWH8ggcE6p0NUf',
  11: 'price_1Lka0BCt7XDWH8ggV3u6Eijv',
  12: 'price_1Lka0hCt7XDWH8ggf4Uw1TAd'
}

const runint = async () => {
  // const cartTotalPrice = await models.sequelize.query(`SELECT p.id, ci.quantity FROM go_pedal.Product p , go_pedal.Cart_Item ci  ,go_pedal.Shopping_Session ss  WHERE ss.id = 2 AND ss.id = ci.ShoppingSessionId AND ci.ProductId =p.id`, { type: QueryTypes.SELECT })

  // const newItemList = cartTotalPrice.map((item) => {
  //   return {
  //     price: ProductPrices[item.id],
  //     quantity: item.quantity
  //   }
  // })

  const ans = await Shopping_Session.findOne({
    where: {
      id: 2
    }
  })

  console.log(ans)
}

runint()
