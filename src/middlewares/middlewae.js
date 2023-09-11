const jwt = require('jsonwebtoken')
const blogsModel = require('../models/blogModel')
const userModel = require('../models/userModel')


// this is for authentication
const authentication = async (req, res, next) => {
    try {
        let token = req.header('x-api-key')

        if (!Object.keys(req.headers).includes('x-api-key')) return res.status(404).send({ status: false, message: "Your Header is missing" })

        if (!token) {
            return res.status(400).send({ status: false, message: "Token is missing" })
        }
        else {
            if (token) {
                let decodedToken = jwt.verify(token, "secret-key")
                req.userId = decodedToken.userId
                // console.log(req.userId)
            } else {
                return res.status(401).send({ status: false, message: "You Are Not Authenticated" })
            }
        }

        next()
    } catch (error) {
        return res.status(500).send({ status: false, message: "Token Invalid" })
    }
}


// this is for authorization
const authorization = async (req, res, next) => {
    try {
        let id = req.userId
        let blogId = req.params.id
        if (blogId) {
            let blog = await blogsModel.findById(blogId)
            if (!blog) {
                return res.status(404).send({ status: false, message: "blog not found" })
            }
            let userId = blog.userId
            if (id != userId) {
                return res.status(401).send({ status: false, message: "You are not authorized" })
            }
        }
        let userId = req.query.userId
        if (userId) {
            if (id != userId) {
                return res.status(401).send({ status: false, message: "You are not authorized" })
            }
        }
        next()
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


// this is for export 
module.exports = { authentication, authorization }