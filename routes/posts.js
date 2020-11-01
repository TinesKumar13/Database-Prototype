express = require("express")

const router = express.Router()

const Post = require("../models/Post")

const {isSignedIn, isAuthenticated} = require("../controllers/auth")

const { getUserById } = require("../controllers/user");


router.param("userId", getUserById);

//Get all post
router.get('/database/:userId', isSignedIn, isAuthenticated , async (req,res) => {
   
    try{
        const posts = await Post.find()
        res.json(posts)
    }catch(err){
        res.json({message:err})
    }

})



//Submit a post
router.post('/createdatabase/:userId',isSignedIn, isAuthenticated ,   (req,res) => {

   const post = new Post({
       name: req.body.name,
       account: req.body.account,
       description : req.body.description
   })

   post.save()
   .then(data => {
       res.json(data)
   })
   .catch(err => {
       res.json([{message:"Check input fields"}])
   })
})


//Specific post

router.get('/getdatabase/:userId/:account',isSignedIn, isAuthenticated , async (req,res) => {

    try{
        const post = await Post.find({account : req.params.account})
       
        if(post == null || post.length == 0){
           return res.json({message:"Not found"})
        }else{
            res.json(post)
        }
       
        }catch(err){
            res.send({message:"Invalid entry"})
        }
        


})

//delete a specific post

router.delete('/deletedatabase/:userId/:account', isSignedIn, isAuthenticated , async (req, res) => {
    try{
        const removedPost = await Post.remove({account:req.params.account})
        res.json(removedPost)
        
    }catch(err){
        res.send({message : err.message})
    }
})


//Update a post

router.patch('/updatedatabase/:userId/:account', isSignedIn, isAuthenticated  ,  async (req,res) => {
    try{
        const updatedPost = await Post.updateOne( {account:req.params.account} , {$set : {name : req.body.name , account :req.body.account , description: req.body.description}} )
        res.json(updatedPost)
    }catch(err){
        res.json({message : err})
    }
})


module.exports = router