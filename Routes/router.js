const express = require('express')
const router = new express.Router()
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Controllers/Middleware/jwtMiddleware')
const multerConfig = require('../Controllers/Middleware/multerMiddleware')

// register API
router.post('/user/register',userController.register)

// login API
router.post('/user/login', userController.login);

// add-Project
router.post('/projects/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProjects)

// getuserprojects
router.get('/user/all-projects',jwtMiddleware,projectController.allUserProjects)

// getallProjects
router.get('/projects/all',jwtMiddleware,projectController.getallProjects)

// gethomeProjects
router.get('/projects/home-projects',projectController.getHomeProjects)
// export router
module.exports = router
