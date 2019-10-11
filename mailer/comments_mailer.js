const nodemailer = require('../config/nodemailer');

exports.newComment = (comment) => {
  console.log('inside newComment Mailer');
  let htmlstring=nodemailer.renderTemplate({comment:comment},'/new_comment.ejs');
  nodemailer.transporter.sendMail({
    from: 'Codeial',
    to: 'ishan4220@gmail.com',
    subject: "new Comment",
    html: htmlstring
  }, (err, info) => {
    if (err) { console.log('error in sending mail',err); return; }

    console.log('Message Sent', info);
    return;
  })
}
