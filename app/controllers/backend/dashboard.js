const config = require('../../../configs/constants')
module.exports ={
    view: async (req,res)=>{
        console.log('admin dashboard view')
        res.render('backend/dashboard',{
            config: config[config.connectionType],
        })
    },
}