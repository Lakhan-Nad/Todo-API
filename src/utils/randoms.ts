import * as crypto from "crypto";
import { Buffer } from "buffer";

const iv = crypto.randomBytes(16);
const key = crypto.randomBytes(32);

export function encrypt(data: string): string {
  let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return JSON.stringify({
    iv: iv.toString("hex"),
    encryptedData: encrypted.toString("hex"),
  });
}

export function decrypt(text: string): string {
  let data = JSON.parse(text);
  let iv = Buffer.from(data.iv, "hex");
  let encryptedText = Buffer.from(data.encryptedData, "hex");
  let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
