(function (sendEmail) {
    var templates = require('./templates'),
        server = require('./server'),
        customSettings = require('./customSettings.js'),
        data = require('../data'),
        auth = require('../auth'),
        _ = require("lodash");
  
    //sends an email from contact us page    
    sendEmail.init = function (app) {

        //allows post an email
        app.post('/sendemail',
            auth.isAllowedDomain,
            function postSendEmail(req, res) {
                var response = {},
                    sentParams = getEmailParams(req),
                    emailParams = {};

                //gets and builds the email template
                emailParams.emailBody = templates.getContactRequest(sentParams);
                emailParams.to = customSettings.getCustomTo(sentParams.site);

                var emailDb = _.merge(sentParams, emailParams);

                server.sendEmail(emailParams, function (error, info) {
                    if (error) {
                        response.success = false;
                        response.message = error;
                    } else {
                        response.success = true;
                        response.message = 'Message sent: ' + info.response;
                    }
                
                    //logs the email tried to send
                    emailDb.sendResponse = response;
                    data.emails.save(emailDb);
                             
                    //sends response back
                    res.send(response);
                });
            });

        function getEmailParams(request) {
            var emailParams = {
                name: request.body.Name || '',
                email: request.body.Email || '',
                comments: request.body.Comments || '',
                site: request.body.Source || '',
                company: request.body.Company || '',
                phone: request.body.Phone || '',
                country: request.body.Country || ''
            };
            return emailParams;
        }
    };

})(module.exports);