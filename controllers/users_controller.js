const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile =async function(req, res){
 
    try{
        let user= await User.findById(req.params.id);
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        })
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
   
}

module.exports.update=async function(req,res){

 try{
    let user=await User.findById(req.params.id);
    User.uploadedAvatar(req,res,function(err){
        if(err){
            console.log("multer error");
        }
        
        user.name=req.body.name;
        user.email=req.body.email;

        if(req.file){
            if(user.avatar){
                fs.unlinkSync(path.join(__dirname,'..',user.avatar));
            }
            user.avatar=User.avatarPath+'/'+req.file.filename;
        }
        user.save();
       return res.redirect('/');
    })

     
 }catch(err){
    console.log(err);
 }
  
}


// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','logged In sucessfully!!!');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success','logged Out!!!');
    return res.redirect('/');
}