module.exports = function(app) {

    app.get('/view/doctor/:business_id', function(req, res) {

        // get the business collection
        var business = app.db.get('business')

         var q = {
            'business_id': req.params.business_id            
        }

        var doctor = business.findOne(q, function(err, item) {

            res.render('viewDoctor.jade', {
                doctor: item
            })
        })

    })
}