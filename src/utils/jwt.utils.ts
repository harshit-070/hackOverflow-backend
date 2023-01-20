import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get<string>("privateKey");

export function sign(object: Object, options?: jwt.SignOptions) {
  return jwt.sign(object, privateKey, options);
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);

    return { valid: true, expired: false, decoded };
  } catch (error) {
    return {
      valid: false,
      expired: (<Error>error).message === "jwt expired",
      decoded: null,
    };
  }
}
