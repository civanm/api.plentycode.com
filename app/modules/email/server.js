(function (emailServer) {
  var nodemailer = require('nodemailer');


  emailServer.sendEmail = function (emailParams, next) {

       var tranporterParams = {
            from: emailParams.from ||  'Plentycode.com <info@plentycode.com>',
            to: emailParams.to || 'civan.cim@gmail.com',
            subject: emailParams.subject ||'New Contact Request!',
            html: emailParams.emailBody || 'empty request',
        };

        var transporter = nodemailer.createTransport({
            service: 'Godaddy',
            auth: {
                user: 'info@plentycode.com',
                pass: 'Pl3ntyc0d3'
            }
        });
        transporter.sendMail(tranporterParams, function (error, info) {
            next(error, info);
        });
  };
})(module.exports);