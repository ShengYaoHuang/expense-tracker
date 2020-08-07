const Category = require('../category')
const db = require('../../config/mongoose')

db.once('open', () => {
  Category.create(
    {
      name: "食品酒水",
      icon: `fas fa-utensils`
    },
    {
      name: "行車交通",
      category: `fas fa-shuttle-van`
    },
    {
      name: "居家物業",
      category: `fas fa-home`
    },
    {
      name: "休閒娛樂",
      category: `fas fa-grin-beam`
    })
    .then(() => {
      console.log('categorySeeder is done')
      db.close()
    })
})