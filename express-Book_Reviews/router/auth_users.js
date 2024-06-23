const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{
    "username": "test",
    "password": "test123"
}];

const isValid = (username)=>{ //returns boolean
    //write code to check is the username is valid
    const userMatches = users.filter((user) => user.username === username);
    return userMatches.length === 0;
}

// Check if the user with the given username and password exists
const authenticatedUser = (username, password) => {
  // Filter the users array for any user with the same username and password
  const validusers = users.filter((user) => user.username === username && user.password === password);
  // Return true if any valid user is found, otherwise false
  return validusers.length > 0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;

    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });
        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {

    const username = req.session.authorization.username;
    const isbn = req.params.isbn;
    const review = req.query.review;
    let book = books[isbn];

    if (book) {
        book.reviews[username] = review;
        return res.status(200).send(`The review for the book with ISBN ${isbn} has been added/updated.`);
    }

    return res.status(404).json({message: `ISBN ${isbn} not found`});
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {

    const username = req.session.authorization.username;
    const isbn = req.params.isbn;
    let book = books[isbn];

    if (book) {
        delete book.reviews[username];
        return res.status(200).send(`Reviews for the ISBN ${isbn} posted by user ${username} deleted.`);
    }

    return res.status(404).json({message: `ISBN ${isbn} not found`});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
