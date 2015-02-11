var doctors = require('./data/doctors.json')
var restaurants = require('./data/restaurants.json')
var users = require('./data/users.json')
var tips = require('./data/tips.json')
var _ = require('lodash')

var _ = require('lodash')

module.exports = function(app) {

    app.get('/search', function(req, res) {
        res.render('search')
    })

    app.get('/search/restaurants/name/has/:keyword', function(req, res) {
        var keyword = req.params.keyword

        // TODO: lookup restaurants whose names contain the given keyword
        var rs = _.filter(restaurants, function(n) {
            return _.includes(n.name, keyword)
        })

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/good/for/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants good for  :x
        var rs = _.filter(restaurants, function(n) {
            if (n.attributes["Good For"]) {
                return n.attributes["Good For"][x]
            }
        })

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/ambience/is/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants has ambience of :x
        var rs = _.filter(restaurants, function(n) {
            if (n.attributes["Ambience"]) {
                return n.attributes["Ambience"][x]
            }
        })

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/category/is/:x', function(req, res) {
        var x = req.params.x
        x = x.replace("-", " ")

        // TODO: lookup restaurants belonging to category :x
        var rs = _.filter(restaurants, function(n) {
            return _.contains(n.categories, x)
        })

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })


    app.get('/search/restaurants/stars/:relationship/:number', function(req, res) {
        var number = req.params.number
        var relationship = req.params.relationship
        var test
        relationship == "above" ?
            test = function(stars, n) { return stars >= n } :
            test = function(stars, n) { return stars <= n }

        // TODO: lookup restaurants with starts higher or lower than :number
        var rs = _.filter(restaurants, function(n) {
            return test(n.stars, number)
        })

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/q', function(req, res) {

        var name = req.query.name
        var minStars = req.query.minStars
        var category = req.query.category
        var ambience = req.query.ambience

        var nameFunc = function(keyword, n) {
            if (!keyword) return true
            return _.includes(n.name, keyword)
        }

        var minStarsFunc = function(minStars, n) {
            if (!minStars) return true
            return minStars <= n.stars
        }

        var categoryFunc = function(x, n) {
            if (!x) return true
            return _.contains(n.categories, x)
        }

        var ambienceFunc = function(x, n) {
            if (!x) return true
            if (n.attributes["Ambience"]) {
                return n.attributes["Ambience"][x]
            }
            return false
        }

        console.log('req.query: ', req.query)

        // // TODO: lookup restaurants with the given query parameters
        var rs = _.filter(restaurants, function(n) {
            return nameFunc(name, n) && minStarsFunc(minStars, n) && categoryFunc(category, n) && ambienceFunc(ambience, n)
        })

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

}
