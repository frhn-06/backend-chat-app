import crypto from 'crypto';
import { SECRET } from './env';

const encrypt = (teks: string) => {
    return crypto.pbkdf2Sync(teks, SECRET, 100, 64, "sha512").toString("hex");
}

export default encrypt;