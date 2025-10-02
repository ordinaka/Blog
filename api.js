import express from "express";
import bodyParser from "body-parser"; 

const router = express.Router();

// In-memory data storelearning
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: new Date()
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: new Date()
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: new Date()
  },
];

let lastId = 3;

// Middleware
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

//CHALLENGE 1: GET All posts
router.get('/posts', (req, res)=>{
  console.log(posts)
  res.json(posts)
});

//CHALLENGE 2: GET a specific post by id
router.get('/posts/:id', (req,res)=>{
  const specificPost = posts.find((post) => post.id === parseInt(req.params.id));
  if (!specificPost) {
    return res.status(404).json({message: "Post not found"});
  } else {
    res.json(specificPost)
  }
});
//CHALLENGE 3: POST a new post
router.post('/posts', (req,res)=>{
  const newId = lastId += 1;
  const newPost = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date()
  }
  lastId = newId;
  posts.push(newPost);
  res.status(201).json(newPost);
});
//CHALLENGE 4: PATCH a post when you just want to update one parameter
router.patch('/posts/:id', (req, res)=>{
  const existingPost = posts.find((post) => post.id === parseInt(req.params.id));
  if (!existingPost) return res.status(404).json({message: "post not found"});
  existingPost.title = req.body.title || existingPost.title;
  existingPost.author = req.body.author || existingPost.author;
  existingPost.content = req.body.content || existingPost.content
  res.json(existingPost);
});

//CHALLENGE 5: DELETE a specific post by providing the post id.
router.delete('/posts/:id', (req,res)=>{
  const deletePost = posts.findIndex((post) => post.id === parseInt(req.params.id))
  if (deletePost === -1) {
    res.status(404).json({
      message: "Post not found",
    })
  } else {
    posts.splice(deletePost, 1);
    res.json({
      message: "Post deleted"
    })
  }
  
});

export default router; 