import nodemailer from 'nodemailer';
declare const transporter: nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo, import("nodemailer/lib/smtp-transport").Options>;
interface ISendMail {
    from: string;
    to: string;
    subject: string;
    html: string;
}
declare const renderHtml: (templates: string, data: any) => Promise<string>;
declare const sendMail: ({ from, to, subject, html }: ISendMail) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
export { renderHtml, sendMail };
export default transporter;
//# sourceMappingURL=nodemailer.d.ts.map