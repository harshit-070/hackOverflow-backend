import AWS from "aws-sdk";
import config from "config";

const SES = new AWS.SES({
  accessKeyId: config.get("AWS.EMAIL_ACCESS_KEY"),
  secretAccessKey: config.get("AWS.EMAIL_SECRET_KEY"),
  region: config.get("AWS.EMAIL_REGION"),
});

export const sendEmail = async (email: string, otp: any) => {
  const emailSent = await SES.sendEmail({
    Source: config.get("AWS.FROM_EMAIL"),
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: "OTP Verification",
      },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `Welcome to Resume Rise. Here is your verification code: ${otp}. Please do not share it with any one`,
        },
      },
    },
  }).promise();
};

export const sendForgotPasswordEmail = async (email: string, otp: any) => {
  const emailSent = await SES.sendEmail({
    Source: config.get("AWS.FROM_EMAIL"),
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: "Forogt Password for OTP",
      },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `Please use the following code to reset the password ${otp}. Please do not share it with any one`,
        },
      },
    },
  }).promise();
};

export const sendResumeEmail = async (email: string, path: any) => {
  const emailSent = await SES.sendEmail({
    Source: config.get("AWS.FROM_EMAIL"),
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: "OTP Verification",
      },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `Welcome to Resume Rise. Here is your verification code: ${path}. Please do not share it with any one`,
        },
      },
    },
  }).promise();
};
