const express=require('express');
const multer  = require('multer')
const path = require('path');
const Blog= require('../models/blog');
const Comment= require('../models/comments');
const router=express.Router();

router.get('/add-blog',(req,res)=>{
    return res.render('addblog',{
        user:req.user,
    });
})

router.get('/:id',async(req,res)=>{
  const blog=await Blog.findById(req.params.id).populate('createdBy');
  const comments=await Comment.find({blogId:req.params.id}).populate('createdBy');

  return res.render('showblog',{
      user:req.user,
      blog,
      comments
  });
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`
      cb(null, filename)
    }
  })
  
const upload = multer({ storage: storage })

router.post('/',upload.single('coverimage'),async(req,res) => {
    const{title,body}= req.body;
    const blog=await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImageURL:`/uploads/${req.file.filename}`
    })
    return res.redirect(`/`)
})

router.post("/comment/:blogid",express.urlencoded({extended:false}),async(req,res)=>{
  await Comment.create({
    content:req.body.content,
    blogId:req.params.blogid,
    createdBy:req.user._id
  })
  return res.redirect(`/blog/${req.params.blogid}`)
})

module.exports=router;