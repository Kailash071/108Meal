
module.exports = {
    aboutView : async function(req,res){
        try {
            console.log('home page render')
           res.render('frontend/aboutUs/about')
        } catch (error) {
            console.log('error: ' + error)
        }
    },
}
