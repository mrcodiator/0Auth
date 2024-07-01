import emailjs from '@emailjs/browser';

export async function sendEmail({ email, code }: { email: string, code: string }) {
    try {
        console.log("PUBLIC_KEY: ", process.env.NEXT_PUBLIC_KEY);

        const templateParams = {
            email: email,
            message: `Your verification code is ${code}`,
        };


        const response = await emailjs.send(
            process.env.NEXT_PUBLIC_SERVICE_ID || "",
            process.env.NEXT_PUBLIC_TEMPLATE_ID || "",
            templateParams,
            {
                publicKey: process.env.NEXT_PUBLIC_KEY || "",
                // privateKey: process.env.PRIVATE_KEY || "",
            }
        );

        console.log('SUCCESS!', response.status, response.text);
        return true;
    } catch (err) {
        console.log('FAILED...', err);
        return false;
    }
}
