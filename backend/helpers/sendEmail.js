const nodemailer = require("nodemailer");
const ejs = require("ejs");

let sendEmail = async ({ viewFileName, data, from, to, subject }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user:process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });


        let dataString = await ejs.renderFile("./views/" + viewFileName+".ejs", data);

        const info = await transporter.sendMail({
            from, // sender address
            to, // list of receivers
            subject, // Subject line
            html: dataString, // html body
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        throw new Error(error);
    }

}
module.exports = sendEmail;