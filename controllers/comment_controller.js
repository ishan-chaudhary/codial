const Comment=require('../models/comment');
const post=require('../models/post');

module.exports.create=function(req,res){
  post.findById(req.body.post,function(err,post){
    if(post){
      Comment.create({
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
};

module.exports.destroy=async function(req,res){
  try{

    let comment=await Comment.findById(req.params.id);

  if(comment.user==req.user.id){

    let postId=comment.post;

    comment.remove();

    await post.findByIdAndUpdate(postId,{
      $pull :{comments: req.params.id}
    })

  }
    return res.redirect('back');
  
  }catch(err){
    console.log(err);
    return;
  }

  

}