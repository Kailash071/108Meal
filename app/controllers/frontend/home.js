
module.exports = {
    homeView : async function(req,res){
        try {
            console.log('home page render')
           res.render('frontend/home/home')
        } catch (error) {
            console.log('error: ' + error)
        }
    },
}
