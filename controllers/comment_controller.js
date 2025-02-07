const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailer/comments_mailer');

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post)
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: req.body.post
      });
      post.comments.push(comment);
      post.save();

      comment = await comment.populate('user', 'name').execPopulate();
      commentsMailer.newComment(comment);

      res.redirect('/');
    }
  } catch (err) {
    console.log(err);
  }

};

module.exports.destroy = async function (req, res) {
  try {

    let comment = await Comment.findById(req.params.id);

    if (comment.user == req.user.id) {

      let postId = comment.post;

      comment.remove();

      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id }
      })

    }
    return res.redirect('back');

  } catch (err) {
    console.log(err);
    return;
  }



}