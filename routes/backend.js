'use strict';

const express = require('express');
const router = express.Router()
const Sys = require('../root/sys');

router.get('/admin',Sys.App.controllers.backend.auth.loginView)
router.get('/admin/dashboard',Sys.App.controllers.backend.dashboard.view)
router.get('/admin/menus',Sys.App.controllers.backend.menus.view)
router.get('/admin/menusCategory',Sys.App.controllers.backend.menusCategory.view)
router.get('/admin/menusCategory/addView',Sys.App.controllers.backend.menusCategory.addMenuCategoryView)
router.post('/admin/menusCategory/add',Sys.App.controllers.backend.menusCategory.addMenuCategory)

module.exports = router