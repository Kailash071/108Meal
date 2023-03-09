module.exports = {
    loginView: async (req,res)=>{
        console.log('admin login page render');
        res.render('backend/auth/login')
    },
}