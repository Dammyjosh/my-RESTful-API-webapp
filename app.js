//jshint esversion:6

const mongoose = require("mongoose");
 
//connect to MongoDB by specifying port to access MongoDB server
main().catch((err) => console.log(err));
 
async function main() {
  mongoose.set("strictQuery", false);
  await mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");
}
 



const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO


const articleSchema ={
	title: String,
	content: String

};


const Article = mongoose.model("Article", articleSchema)

  app.route("/articles")
  
  
  .get(async (req, res) => {
    await Article.find().then(foundArticles => {

        res.send(foundArticles);
    }).catch(err => {
        console.log(err);
       })
   })


  .post((req, res)=> {

   const article1 = new Article ({

    title: req.body.title,
	content: req.body.content

      })
    article1.save()
   .then (() => {
    res.send("New article succesfully added")
    })
   .catch (err =>{ 
    res.send(err)
     })
   })



   .delete(async (req, res) => {
    await Article.find().then(foundArticles => {

        res.send(foundArticles);
    }).catch(err => {
        console.log(err);
    })
   });

  


   //request for ONE article
   app.route('/articles/:articleTitle')
   
   .get( async (req, res) => {
        await Article.findOne(
            { title: req.params.articleTitle})
            .then (foundArticle => {
                res.send(foundArticle);
            })
        .catch(err => {
        console.log(err);
      })
    })
    
    .put(async (req, res) => {
        await Article.replaceOne(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content })
            .then (replacedArticle =>{
                res.send("Succesfully replaced");
            })
            .catch(err => {
        console.log(err);
           })
      })
    
      .patch(async (req, res) =>{
       await Article.updateOne(
            { title: req.params.articleTitle },
            { $set: req.body },
            { overwrite: true })
            .then (UpdateItem => {
                res.send('Article successfully updated');
            })
            .catch(err => {
        console.log(err);
           })
        
    })
    
    .delete(async (req, res)=> {
        await Article.deleteOne(
            { title: req.params.articleTitle })
            .then (deletedArticle =>{
                res.send("Article Successfully deleted");
            })
        .catch(err => {
        console.log(err);
     })
    })



app.listen(3000, function() {
  console.log("Server started on port 3000");
});

