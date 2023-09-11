const express = require('express')
const router = express.Router()

// This is the middleware For Authentication and Authorization -  
const { authentication, authorization } = require('../middlewares/middlewae')



// ----------------------------------------------------------------------------------
// User Register & LogIn Controller - 
const { userRegister, userLogin } = require('../controllers/userRegister&logIn')

// User Register & LogIn Routes - 
router.post('/register', userRegister)
router.post('/login', userLogin)

// ----------------------------------------------------------------------------------



// Blog CRUD Controller and Routes - 
const { createBlog, readBlog, updateBlog, deleteBlog } = require('../controllers/blogCRUD')


// CreateBlog - 
router.post('/createBlog', authentication, createBlog)

// ReadBlog - 
router.get('/readBlog', authentication, readBlog)

// UpdateBlog -
router.put('/updateBlog/:id', authentication, authorization, updateBlog)

// DeleteBlog - 
router.delete('/deleteBlog/:id', authentication, authorization, deleteBlog)



module.exports = router