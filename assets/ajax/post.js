{
  let createPost = function () {
    let postForm = $('#new-post-form');

    postForm.submit(function (event) {
      event.preventDefault();

      $.ajax({
        type: 'post',
        url: '/posts/create',
        data: postForm.serialize(),
        success: function (data) {
          console.log(data);
          let newPost = newPostDom(data.data.post);
          deletepost($(' .delete-post-link',newPost));
          $('#posts-list-container>ul').prepend(newPost);
        },
        error: function (err) {
          console.log(err);
        }
      })

      // postForm[0].reset();

    })
  }


  // method to show posts
  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
    <p>
       ${ post.content}
        <br>
        <small>
            ${ post.user.name}
        </small><br>
        This post is created by ajax
        

        <a href="/posts/destroy/${post._id}" class="delete-post-link">X</a>

       
    </p>
    <div class="post-comments">
        
        <form action="/comments/create" method="POST" id="post-form">
            <input type="text" name="content" placeholder="Type..">
            <input type="hidden" name="post" value="${post._id}">
            <button type="submit">Submit</button>
        </form>
        

        <div class="pos-comments-list">
            <ul id="post-comments-${post._id}">
              
            </ul>
        </div>
    </div>

</li>
`)
  }


    let deletepost=function(deleteLink){
      $(deleteLink).click(
        function(event){
        event.preventDefault();
        console.log('hey');
        
        $.ajax({
          type:'get',
          url:$(deleteLink).prop('href'),
          success:function(data){
            $(`#post-${data.data.post_id}`).remove();
          },
          error :function(error){
            console.log(error.responseText);
          }
        })
      }
      )
    }

  createPost();
}