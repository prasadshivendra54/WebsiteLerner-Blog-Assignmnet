# Blogging Platform API

This is a simple blogging platform API that provides user registration and login functionality, CRUD operations for blog posts, and uses a non relational database for data storage. Below are the main features and details of this API.

## This is The Live Link Of The Blog-API's 👇👇👇

Just click and check in Postman with Endpoint-- `Endpoint: https://websitelerners-blog-api.glitch.me/register`

### https://websitelerners-blog-api.glitch.me

## Features

1.  **User Registration and Login:**

    - Users can register and log in using JSON Web Tokens (JWT) for authentication.

    ### User APIs /register

    - Create a user from request body in Postman.
      `Endpoint: BASE_URL/register`

    ### User APIs /login

    - Login user from request body in Postman.
      `Endpoint: BASE_URL/login`

2.  **Blog Post Creation, Reading, Updating, and Deletion (CRUD Operations):**

    - Logged-in users can perform CRUD operations on blog posts, including creating, reading, updating, and deleting their own posts.

    ### Blog Post APIs POST /createBlog

    - CreateBlog from request body in Postman.
      `Endpoint: BASE_URL/createBlog`

    ### Blog Read APIs GET /readBlog

    - ReadBlog from request in Postman.
      `Endpoint: BASE_URL/readBlog`

    ### Blog Update APIs PUT /updateBlog/:id

    - UpdateBlog from request body in Postman.
      `Endpoint: BASE_URL/updateBlog/:id`

    ### Blog Delete APIs DELETE /deleteBlog/:id

    - DeleteBlog from request in Postman.
      `Endpoint: BASE_URL/deleteBlog/:id`

3.  **Database:**

    - This API stores all data in a non relational database MongoDB Database.

### Authentication

- Add an authorisation implementation for the JWT token that validates the token before every protected endpoint is called. If the validation fails, return a suitable error message with a corresponding HTTP status code
- Protected routes are create a blog, edit a blog, get the list of blogs, delete a blog(s)

- Set the token in request header in Postman, once validated, in the request - `x-api-key`

Example:- key :- `x-api-key`, and value/Token:- `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGZlMDgwZWQwNjRlMWI1MTEwN2Q3NzIiLCJpYXQiOjE2OTQzNzAxNjF9.uSQXSZBPLAy69GcE8NsDNjrRbNs0QxLkeZws7H3YnXQ` NOTE:- This token is the example of JWT token, for every user login api will create new valid token

- Used a middleware for authentication and Authorisation purpose.

### Authorisation

- Make sure that only the owner of the blogs is able to edit or delete the blog.
- In case of unauthorized access return an appropirate error message.

## NOTE:-

1. You must have MongoDB Compass to connection with MongoDB databaseb in Your System
   loccalhost:27017 or mongodb://127.0.0.1:27017

- This is the connection string to MongoDB database - (## No need to write this string in this project everything is written hear, this is only for your information)

// Database Connection -
mongoose.connect("mongodb://127.0.0.1:27017/websitelerner", {
useNewUrlParser: true
}).then(() => {
console.log('Database connected')
}).catch((error) => {
console.log(error.message)
})

2. Just follow theae instruction and you can test all features

👇👇👇👇👇👇

## Installation and Usage

1. Clone this repository.
2. Install project dependencies using `npm install` or `npm i`.
3. Start the server with `npm start`.
4. Access the API endpoints as documented.

OR

## This is The Live Link Of The Blog-API's 👇👇👇

Just click and check in Postman with Endpoint-- `Endpoint: https://websitelerners-blog-api.glitch.me/register`

### https://websitelerners-blog-api.glitch.me
