const sgMail  = require('@sendgrid/mail')
const senderGridApikey = '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'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        to :email,
        from:'pramod@bookkeeperapp.net',
        text:`Welcome to the app, ${name}, Let me know how you get along with the app.`,
        subject :'Thanks for joining in!'
    })
}

const sendCancelEmail = (email,name)=>{
    sgMail.send({
        to :email,
        from:'pramod@bookkeeperapp.net',
        text:`Hi, ${name}, Let me know the reason behind the cancellation of account.`,
        subject :'Account removed!'
    })
}



module.exports  = {
    sendWelcomeEmail,
    sendCancelEmail
}
