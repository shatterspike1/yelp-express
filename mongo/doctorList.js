module.exports = function(app) {
    
    app.get('/list/doctors', function(req, res) {

        // get the business collection
        var business = app.db.get('business')

        // compose a query to look up docs whose 'categories' field contains the word 'Doctors'
        var q = {
            'categories': {
                $in: ['Doctors']
            }
        }

        // execute the query to find those matched limiting to 20
        business.find(q, {
            limit: 20
        }, function(err, docs) {

            res.render('listDoctors.jade', {
                doctors: docs
            })
        })

    })
}