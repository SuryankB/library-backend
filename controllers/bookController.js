const Book = require("../models/Book")

exports.addBook = async(req,res,next)=>{
try{

const data = req.body

data.availableCopies = data.totalCopies

data.status = data.availableCopies > 0 ? "Available" : "Checked Out"

const book = await Book.create(data)

res.status(201).json(book)

}catch(error){
next(error)
}
}

exports.getBooks = async(req,res,next)=>{
try{

const books = await Book.find()

res.status(200).json(books)

}catch(error){
next(error)
}
}

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

exports.updateBook = async(req,res,next)=>{
try{

const book = await Book.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
)

res.status(200).json(book)

}catch(error){
next(error)
}
}

exports.deleteBook = async(req,res,next)=>{
try{

await Book.findByIdAndDelete(req.params.id)

res.status(200).json({message:"Book deleted"})

}catch(error){
next(error)
}
}

exports.searchBook = async(req,res,next)=>{
try{

const books = await Book.find({
title:{$regex:req.query.title,$options:"i"}
})

res.status(200).json(books)

}catch(error){
next(error)
}
}