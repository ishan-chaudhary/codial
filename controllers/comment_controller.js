const comment=require('../models/comment');
const post=require('../models/post');

module.exports.create=function(req,res){
  post.findById(req.body.post,function(err,post){
    if(post){
      comment.create({
        content:req.body.content,
        user : req.user._id,
        post :req.body.post
      },function(err,comment){
        post.comments.push(comment);
        post.save();
        res.redirect('/');
      })
    }
  })
}