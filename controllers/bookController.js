const Book = require("../models/Book")

// Add Book
exports.addBook = async(req,res,next)=>{
try{

const data = req.body

// ensure numbers
data.totalCopies = Number(data.totalCopies)

// available copies = total copies initially
data.availableCopies = data.totalCopies

// correct status
data.status = data.availableCopies > 0 ? "Available" : "Issued"

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

// update available copies logic
if(data.availableCopies !== undefined){

data.availableCopies = Number(data.availableCopies)

// update status automatically
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

// Search Book (ID / Title / Author)
exports.searchBook = async (req, res, next) => {
try {

const query = req.query.q

if(!query){
return res.status(400).json({message:"Search query required"})
}

const books = await Book.find({
$or:[
{_id: query},
{title:{$regex:query,$options:"i"}},
{author:{$regex:query,$options:"i"}}
]
})

res.status(200).json(books)

}catch(error){
next(error)
}
}