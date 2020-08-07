const Category = require('../category')
const db = require('../../config/mongoose')

db.once('open', () => {
  Category.create(
    {
      name: "餐飲食品",
      icon: `fas fa-utensils `
    },
    {
      name: "交通出行",
      category: `fas fa-shuttle-van `
    },
    {
      name: "家居物業",
      category: `fas fa-home `
    },
    {
      name: "休閒娛樂",
      category: `fas fa-grin-beam `
    },
    {
      name: "其他",
      category: `fas fa-pen `
    })
    .then(() => {
      console.log('categorySeeder is done')
      db.close()
    })
})