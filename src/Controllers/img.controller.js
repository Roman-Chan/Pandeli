import multer  from "multer";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(__filename,"../../img");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,__dirname)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,  uniqueSuffix + "-" +file.originalname)
    }
})
const upload = multer({ storage: storage });
export const uploadmulter = upload.single("imagen");