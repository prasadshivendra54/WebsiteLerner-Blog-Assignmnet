const blogModel = require('../models/blogModel')
const userModel = require('../models/userModel')


// ____________________ POST _________________________


// This is for create blog - 
const createBlog = async (req, res) => {
    try {
        let blogData = req.body

        // for title validate 
        if (!blogData.title) return res.status(400).json({ status: false, message: "Please Fill Title" })
        if (blogData.title.length <= 2) return res.status(400).json({ status: false, message: "Title Should be morethen 3 charector" })

        // for body validate
        if (!blogData.body) return res.status(400).json({ status: false, message: "Please Fill Body" })
        if (blogData.body.length <= 2) return res.status(400).json({ status: false, message: "Body Should Be morethen 3 charector" })

        // for AuthorId validate
        if (!blogData.userId) return res.status(400).json({ status: false, message: "Please Give Author ID" })
        if (blogData.userId.length != 24) return res.status(400).json({ status: false, message: "Author Id Must Be 24 charector" })

        // for tags validate
        if (blogData.tags == "") return res.status(400).json({ status: false, message: "Tags can not be Empty" })
        if (blogData.tags) {
            let tags = blogData.tags
            var isValid = Array.isArray(tags) && tags.every(value => typeof value === "string");
            if (!isValid) return res.status(400).json({ status: false, message: "Tags Should be Array of String" })
        }

        // for category validate
        if (!blogData.category) return res.status(400).json({ status: false, message: "Please set category" })
        if (blogData.category.length <= 2) return res.status(400).json({ status: false, message: "Category Should be morethen 3 charector" })
        if (typeof blogData.category !== 'string') return res.status(400).json({ status: false, message: "category Should be string formate" })

        // for subcategory validate
        if (blogData.subcategory == "") return res.status(400).json({ status: false, message: "Subcategory can not be Empty" })
        if (blogData.subcategory) {
            let subcategory = blogData.subcategory
            var isValid = Array.isArray(subcategory) && subcategory.every(value => typeof value === "string");
            if (!isValid) return res.status(400).json({ status: false, message: "Subcategory Should be Array of String" })
        }

        // for author validate
        let findUser = await userModel.findById({ _id: blogData.userId })
        if (!findUser) return res.status(400).json({ status: false, message: "Author id not Exist" })

        // blogData.userId = req.decode.userId
        if (blogData.userId != req.userId) return res.status(401).json({ status: false, message: "You Are Not Authenticated" })
        let data = await blogModel.create(blogData)
        return res.status(201).json({ status: true, data })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}





// ____________________ GET _________________________

// This is for get/read Blogs - 
const readBlog = async (req, res) => {
    try {
        let data = await blogModel.find({ isDeleted: false })
        if (data.length > 0) {
            return res.status(200).json({ status: true, message: "Blogs list", data })
        } else {
            return res.status(404).json({ status: false, message: "Data Not found" })
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
}





// ____________________ PUT _________________________

// This is for update Blog - 
const updateBlog = async (req, res) => {
    try {
        let blogId = req.params.id
        if (!blogId) {
            return res.status(400).send({ status: false, message: "Please give BlogId" })
        }
        if (blogId.length != 24) return res.status(400).send({ status: false, message: "Id Should be 24 charectors" })

        let blogData = req.body
        let findId = await blogModel.findById(blogId)
        if (!findId) {
            return res.status(404).send({ status: false, message: "BlogId Not Exist" })
        }
        if (findId.isDeleted == true) return res.status(404).send({ status: false, message: "No Blogs" })
        let data = await blogModel.findByIdAndUpdate(
            { _id: blogId },
            {
                $push: {
                    tags: blogData.tags,
                    subcategory: blogData.subcategory
                },
                title: blogData.title,
                body: blogData.body
            },
            { new: true })
        return res.status(200).send({
            status: true,
            message: "Blog updated successfully",
            data
        })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}





// __________________________ DELETE _________________________

// This is for Delete blog - 
const deleteBlog = async (req, res) => {

    try {
        let blogId = req.params.id
        if (blogId.length != 24) return res.status(400).send({ status: false, message: "Id Should be 24 charectors" })

        let findId = await blogModel.findById(blogId)
        if (!findId) return res.status(404).send({ status: false, message: "Blog Id Not Exist" })
        if (findId.isDeleted == true) return res.status(404).send({ status: false, message: "No blogs" })

        let data = await blogModel.findByIdAndUpdate({ _id: blogId },
            { isDeleted: true, deletedAt: new Date() },
            { new: true }
        )

        return res.status(200).send({ status: true, message: "Deleted successfully" })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}





module.exports = {
    createBlog,
    readBlog,
    updateBlog,
    deleteBlog
}