const express = require("express")
const router = express.Router()

const {
addBook,
getBooks,
getBookById,
updateBook,
deleteBook,
searchBook
} = require("../controllers/bookController")

router.post("/books",addBook)

router.get("/books",getBooks)

router.get("/books/search",searchBook)

router.get("/books/:id",getBookById)

router.put("/books/:id",updateBook)

router.delete("/books/:id",deleteBook)

module.exports = router