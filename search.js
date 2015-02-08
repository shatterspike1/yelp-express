var doctors = require('./data/doctors.json')
var restaurants = require('./data/restaurants.json')
var users = require('./data/users.json')
var tips = require('./data/tips.json')
var _ = require('lodash')

module.exports = function(app) {

    app.get('/search', function(req, res) {
        res.render('search')
    })

    app.get('/search/restaurants/name/has/:keyword', function(req, res) {
        var keyword = req.params.keyword

        var rs = _.filter(restaurants, function(x){return _.includes(x.name, keyword)})

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/good/for/:x', function(req, res) {
        var x = req.params.x

        var rs = _.filter(restaurants, function(n) {
            if ('Good For' in n.attributes) {
                return n.attributes['Good For'][x]
            }
            else {
                return false
            }
        })

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/ambience/is/:x', function(req, res) {
        var x = req.params.x

        var rs = _.filter(restaurants, function(n) {
            if ('Ambience' in n.attributes) {
                return n.attributes['Ambience'][x]
            }
            else {
                return false
            }
        })

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

    app.get('/search/restaurants/category/is/:x', function(req, res) {
        var x = req.params.x
        x = x.replace('-', ' ')

        var rs = _.filter(restaurants, function(n){return _.includes(n.categories, x)})

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    


    app.get('/search/restaurants/stars/:relationship/:number', function(req, res) {
        var number = req.params.number
        var relationship = req.params.relationship

        // TODO: lookup restaurants with starts higher or lower than :number
        var rs = _.filter(restaurants, function(n){
            if (relationship == 'above') {
                return n.stars >= number
            }
            else {
                return n.stars <= number
            }
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
        
        console.log('req.query: ', req.query)    
        
        // // TODO: lookup restaurants with the given query parameters
        var rs = restaurants
        if (name) {
            rs = _.filter(rs, function(x){return _.includes(x.name, name)})
        }
        if (minStars) {
            rs = _.filter(rs, function(n){
                return n.stars >= minStars}
            )
        }
        if (category) {
            var hold = category
            hold.replace('+', ' ')
            rs = _.filter(rs, function(n){return _.includes(n.categories, hold)})
        }
        if (ambience) {
            rs = _.filter(rs, function(n) {
                if ('Ambience' in n.attributes) {
                    return n.attributes['Ambience'][ambience]
                }
                else {
                    return false
                }
            })
        }

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

}