const express = require("express")
const mongoose=require("mongoose");
const app=express();
const bodyparser=require("body-parser");
const db = mongoose.connect('mongodb://localhost/restApi');
const Book =require('./models/bookModel');
const bookRouter=require('./routes/bookroutes')(Book);
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());
var port=process.env.PORT||3000;
app.use('/api',bookRouter);

app.get('/',(req,res)=>{
    res.send('heyyyyy')
})
app.listen(port,()=>{
    console.log("server is on")
})

























/* const url = 'mongodb://localhost:27017';
    const dbName = 'restApi';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);

        const db = client.db(dbName);

        const col =  db.collection('books');

        const books = await col.find();

        res.json(books)
      } catch (err) {
        console.log(err)
      }
      client.close();
    }()); */