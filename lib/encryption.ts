import crypto from "crypto";

const SALT_LENGTH = 32;
const IV_LENGTH = 32;
const KEY_LENGTH = 16;
const ALGORITHM = "aes-256-cbc";

export function generateMasterPassword(length: number = KEY_LENGTH): string {
    // Ensure the length is between 8 and 64 characters
    length = Math.max(8, Math.min(64, length));
    return crypto.randomBytes(length).toString("base64").slice(0, length);
}

// The master password is not stored anywhere, therefore we need to salt it
// and is used to encrypt and decrypt the data
export function deriveKey(masterPassword: string, salt: Buffer): Buffer {
    return crypto.pbkdf2Sync(
        masterPassword,
        salt,
        100000,
        KEY_LENGTH,
        "sha512"
    );
}

// This function encrypts the data using the master password
export function encrypt(data: string, masterPassword: string): string {
    const salt = crypto.randomBytes(SALT_LENGTH);
    const key = deriveKey(masterPassword, salt);
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");

    return salt.toString("hex") + iv.toString("hex") + encrypted;
}

export function decrypt(encryptedData: string, masterPassword: string): string {
    const salt = Buffer.from(encryptedData.slice(0, SALT_LENGTH * 2), "hex");
    const iv = Buffer.from(
        encryptedData.slice(SALT_LENGTH * 2, (SALT_LENGTH + IV_LENGTH) * 2),
        "hex"
    );
    const encrypted = encryptedData.slice((SALT_LENGTH + IV_LENGTH) * 2);

    const key = deriveKey(masterPassword, salt);
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
}
