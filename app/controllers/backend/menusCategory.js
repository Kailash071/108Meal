const config = require('../../../configs/constants')
module.exports ={
    view: async (req,res)=>{
        try {
            console.log('admin menu view')
       return res.render('backend/menusCategory/menusCategory',{
            config: config[config.connectionType],
        })
        } catch (error) {
            console.log('error',error)
            return res.redirect('/admin/dashboard')
        }
    },
    addMenuCategoryView:async (req,res)=>{
        try {
            console.log('addMenuCategory page render')
            return res.render('backend/menusCategory/addMenusCategory',{
                config: config[config.connectionType],
            })
        } catch (error) {
            console.log('error',error)
            return res.redirect('/admin/menusCategory')
        }
    },
    addMenuCategory:async (req,res)=>{
        try {
            console.log('addMenuCategory page render')
            return res.end('hello')
        } catch (error) {
            console.log('error',error)
            return res.redirect('/admin/menusCategory')
        }
    },
}