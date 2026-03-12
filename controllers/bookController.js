const Book = require("../models/Book")

// Add Book
exports.addBook = async(req,res,next)=>{
try{

const data = req.body

// set available copies equal to total copies
data.availableCopies = data.totalCopies

// initial status
data.status = "Available"

const book = await Book.create(data)

res.status(201).json(book)

}catch(error){
next(error)
}
}

// Get All Books
exports.getBooks = async(req,res,next)=>{
try{

const books = await Book.find()

res.status(200).json(books)

}catch(error){
next(error)
}
}

// Get Book By ID
exports.getBookById = async(req,res,next)=>{
try{

const book = await Book.findById(req.params.id)

if(!book){
return res.status(404).json({message:"Book not found"})
}

res.status(200).json(book)

}catch(error){
next(error)
}
}

// Update Book
exports.updateBook = async(req,res,next)=>{
try{

const data = req.body

// update status automatically
if(data.availableCopies !== undefined){
data.status = data.availableCopies > 0 ? "Available" : "Issued"
}

const book = await Book.findByIdAndUpdate(
req.params.id,
data,
{new:true}
)

if(!book){
return res.status(404).json({message:"Book not found"})
}

res.status(200).json(book)

}catch(error){
next(error)
}
}

// Delete Book
exports.deleteBook = async(req,res,next)=>{
try{

await Book.findByIdAndDelete(req.params.id)

res.status(200).json({message:"Book deleted"})

}catch(error){
next(error)
}
}

// Search Book by Title
exports.searchBook = async (req, res, next) => {
try {

const query = req.query.q

if(!query){
return res.status(400).json({message:"Search query required"})
}

let books

// if query looks like MongoDB ID
if(query.length === 24){

books = await Book.find({
$or:[
{_id: query},
{title:{$regex:query,$options:"i"}},
{author:{$regex:query,$options:"i"}}
]
})

}else{

books = await Book.find({
$or:[
{title:{$regex:query,$options:"i"}},
{author:{$regex:query,$options:"i"}}
]
})

}

res.status(200).json(books)

}catch(error){
next(error)
}
}