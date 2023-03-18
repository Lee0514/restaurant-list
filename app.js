const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantData = require('./restaurant.json').results

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantData })
})

app.get('/search', (req, res) => {
  if (!req.query.keyword) {
    return res.redirect('/')
  }

  const keyword = req.query.keyword
  const restaurant = restaurantData.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
  })
  res.render('index', { restaurants: restaurant, keyword: keyword })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantData.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurants: restaurant })
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})