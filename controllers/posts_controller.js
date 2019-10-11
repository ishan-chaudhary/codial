const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        })

        post = await post.populate('user', 'name').execPopulate();
        if (req.xhr) {
            req.flash('success',"created post Sucessfully!!");
            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'Post Created !!'
            })
        }
        return res.redirect('back');
    } catch (err) { return res.redirect('back'); }

}

module.exports.destroy = function(req,res){

   Post.findById(req.params.id,function(err,post){
       
        if(post.user==req.user.id){

            post.remove();

            Comment.deleteMany({post : req.params.id},function(err){

            if(req.xhr){
                req.flash('success',"deleted post Sucessfully!!");
                return res.status(200).json({
                    data:{
                        post_id :req.params.id,
                    },
                    message:"post deleted"
                })
            }
            return res.redirect('back');

            });
            
        }else{
            return res.redirect('back');

        }

   });

  
}