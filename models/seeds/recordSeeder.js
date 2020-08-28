const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = {
  name: 'USER',
  email: 'user@gmail.com',
  password: '0000'
}

const SEED_RECORD = [
  {
    name: "午餐",
    category: "餐飲食品",
    merchant: "港記燒臘",
    date: "2020-06-03",
    amount: "150"
  },
  {
    name: "晚餐",
    category: "餐飲食品",
    merchant: "眼鏡鱔魚意麵",
    date: "2020-07-01",
    amount: "200"
  },
  {
    name: "捷運",
    category: "交通出行",
    date: "2020-08-17",
    amount: "120"
  },
  {
    name: "電影 : 驚奇隊長",
    category: "休閒娛樂",
    merchant: "威秀影城",
    date: "2020-08-15",
    amount: "220"
  },
  {
    name: "租金",
    category: "家居物業",
    date: "2020-08-01",
    amount: "25000"
  }
]

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: 5 },
        (_, i) => Record.create({
          name: SEED_RECORD[i].name,
          category: SEED_RECORD[i].category,
          merchant: SEED_RECORD[i].merchant,
          date: SEED_RECORD[i].date,
          amount: SEED_RECORD[i].amount,
          userId
        })
      ))
    })
    .then(() => {
      console.log('recordSeeder is done')
      process.exit()
    })
    .catch(error => res.render('error', { error_msg: String(error) }))
})