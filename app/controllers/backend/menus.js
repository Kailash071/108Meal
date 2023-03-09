const config = require('../../../configs/constants')
module.exports ={
    view: async (req,res)=>{
        console.log('admin menu view')
        res.render('backend/menus/menus',{
            config: config[config.connectionType],
        })
    },
}