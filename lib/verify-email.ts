'use server';
import nodemailer from "nodemailer";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "40ebda940a5860",
        pass: "432c8ce7d53b0c"
    }
});

export async function sendVerificationEmail({ email, code }: { email: string, code: string }) {
    try {
        // send mail with defined transport object
        const info = await transport.sendMail({
            from: `onboarding@resend.dev`, // sender address
            to: email, // list of receivers
            subject: "Verify your email address", // Subject line
            text: `Your verification code is ${code}`, // plain text body
            html: `<p>Your verification code is <strong>${code}</strong></p>`, // html body
        });

        console.log("Message sent: %s", info.messageId, email);
        return true;
    } catch (error) {
        console.error("Error sending verification email:", error);
        return false;
    }
}
// export async function sendEmail({ email, code }: { email: string, code: string }) {
//     try {
//         const { data, error } = await resend.emails.send({
//             from: 'Acme <onboarding@resend.dev>',
//             to: ['delivered@resend.dev'],
//             subject: 'Hello world',
//             html: `<p>Your verification code is <strong>${code}</strong></p>`,
//         });

//         if (error) {
//             return false;
//         }

//         return true;
//     } catch (error) {
//         return false
//     }
// }
