'use strict';

const express = require('express');
const router = express.Router()
const Sys = require('../root/sys');

router.get('/',Sys.App.controllers.frontend.home.homeView)
router.get('/about',Sys.App.controllers.frontend.about.aboutView)
router.get('/menu',Sys.App.controllers.frontend.menu.menuView)
router.get('/contactUs',Sys.App.controllers.frontend.contactUs.contactUsView)
module.exports = router