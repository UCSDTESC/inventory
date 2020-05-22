import * as crypto from 'crypto';
import * as multer from 'multer';
import { getExtension } from 'mime';

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    return crypto.pseudoRandomBytes(16, (err, raw) =>
      cb(null, `${raw.toString('hex')}.${getExtension(file.mimetype)}`));
  },
});

export default multer({
  storage,
  // 5MB file size
  limits: {fileSize: 5 * 1024 * 1024},
});