const express = require("express")
const booksConroller=require('../bookcontroller/bookController')

function routes(Book) {
    const bookRouter = express.Router();
    const controller=booksConroller(Book);
    bookRouter.route('/books')
        .post(controller.post)
        //////////////////////////////////
        .get(controller.get)
        /////middleware/////
        bookRouter.use('/books/:bookId',(req,res,next)=>{
           
        Book.findById(req.params.bookId, (err, book) => {
            if (err) {
                return res.send(err)
            }
            if(book){
                req.book=book;
                return next();
            }
            res.sendStatus(404);
        })

        })
    bookRouter.route('/books/:bookId')
    .get((req, res) =>{
        const returnbook=req.book.toJSON();
        returnbook.links={};
        returnbook.links.filterbygenre=`http://${req.headers.host}/api/books/?genre=${req.book.genre}` 
        res.json(returnbook)
    })
    .put((req,res)=>{

        const {book}=req;
            book.title=req.body.title;
            book.genre=req.body.genre;
            book.author=req.body.author;
            book.read=req.body.read;
            book.save()
            return res.json(book)
        })
        .patch((req,res)=>{
          const {book} =req;
          if(req.body._id){
              delete req.body._id
          }
          Object.entries(req.body).forEach((item)=>{
              const key =item[0];
              const value=item[1];
              book[key]=value
          });
          req.book.save((err)=>{
              if(err){
                  return res.send(err)
              }
              return res.json(book);
          })
        
        })
        .delete((req,res)=>{
            req.book.remove((err)=>{
                if(err){
                    return res.send(err)
                }
                return res.sendStatus(204)
            })
        })
return bookRouter
}
module.exports = routes;