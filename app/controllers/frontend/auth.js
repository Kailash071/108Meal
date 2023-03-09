
module.exports = {
    login : async function(req,res){
        try {
            console.log('login page render')
            res.end('login page render')
        } catch (error) {
            console.log('error: ' + error)
        }
    },
}
