const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


// _______________ Register User / POST ________________


const userRegister = async (req, res) => {
    try {
        let userData = req.body

        // for firstName validate
        if (!userData.firstName) return res.status(400).json({ status: false, message: "firstName is Required" })
        let nameFormate = /^[A-Za-z]+$/ // this is for name validation
        if (typeof userData.firstName !== "string" || !nameFormate.test(userData.firstName)) return res.status(400).json({ status: false, message: "enter valid firstName" })
        if (userData.firstName.length <= 2) return res.status(400).json({ status: false, message: "firstName must be morethen 3 chareactor" })

        // for lastName validate
        if (!userData.lastName) return res.status(400).json({ status: false, message: "lastName is Required" })
        if (typeof userData.lastName !== "string" || !nameFormate.test(userData.lastName)) return res.status(400).json({ status: false, message: "enter valid lastName" })
        if (userData.lastName.length <= 2) return res.status(400).json({ status: false, message: "lastName also must be morethen 3 chareactor" })

        // for title validate
        if (!userData.title) return res.status(400).json({ status: false, message: "Title is Required" });
        if (typeof userData.title !== 'string') return res.status(400).json({ status: false, message: "Title should be string" });
        let enm = ['Mr', 'Miss', 'Mrs'] // Single choice
        if (!enm.includes(userData.title)) return res.status(400).json({ status: false, message: "Title not exist" })

        // for email validate
        let emailFormat = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
        if (!userData.email) return res.status(400).json({ status: false, message: "Email is Required" })
        if (!emailFormat.test(userData.email)) return res.status(400).json({ status: false, message: "Please enter valid email" })
        let findEmail = await userModel.find({ email: userData.email })
        if (findEmail.length > 0) return res.status(400).json({ status: false, message: "Email already exist" })

        // for password validate
        if (!userData.password) return res.status(400).json({ status: false, message: "Please make your password" })
        if (userData.password.length <= 5) return res.status(400).json({ status: false, message: "Password should be morethen 6 charector" })


        let data = await userModel.create(userData)
        return res.status(201).json({ status: true, data })

    } catch (error) {
        return res.status(500).json(error.message)
    }
}





// _________________________ Login User / POST ___________________________________

// This is for Login user and Get Token

const userLogin = async (req, res) => {
    try {
        let data = req.body
        let { email, password } = data

        // for email and password validate
        if (!email || !password) {
            if (!email) return res.status(400).json({ status: false, message: "Please enter your email ( कृपया अपना ईमेल डालें )" })
            if (!password) return res.status(400).json({ status: false, message: "Please enter your password ( कृपया अपना पासवर्ड डालें ! )" })
        }

        let user = await userModel.findOne({ email: email })

        // for user validate
        if (user) {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (isPasswordCorrect) {
                let data = jwt.sign({ userId: user._id.toString() }, "secret-key")
                return res.status(201).json({ status: true, message: "User login successfull", data: { userId: user._id, token: data } })
            } else {
                return res.status(400).json({ status: false, message: "Email OR Password Is Incorrect ( आपका ईमेल या पासवर्ड गलत है, कृपया दोबारा प्रयास करें ! )" })
            }
        } else {
            return res.status(400).json({ status: false, message: "Email OR Password Is Incorrect ( आपका ईमेल या पासवर्ड गलत है, कृपया दोबारा प्रयास करें ! )" })
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}


module.exports = {
    userRegister,
    userLogin
}