const Record = require('../record')
const db = require('../../config/mongoose')

db.once('open', () => {
  Record.create(
    {
      name: "午餐",
      category: "食品酒水",
      date: "2020-08-08",
      amount: "60"
    },
    {
      name: "晚餐",
      category: "食品酒水",
      date: "2020-08-08",
      amount: "60"
    },
    {
      name: "捷運",
      category: "行車交通",
      date: "2020-08-08",
      amount: "120"
    },
    {
      name: "電影 : 驚奇隊長",
      category: "休閒娛樂",
      date: "2020-08-08",
      amount: "220"
    },
    {
      name: "租金",
      category: "居家物業",
      date: "2020-08-01",
      amount: "25000"
    })
    .then(() => {
      console.log('recordSeeder is done')
      db.close()
    })
})