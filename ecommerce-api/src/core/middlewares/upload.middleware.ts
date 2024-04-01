import util from "util";
import multer from "multer";
import path, {dirname} from "path";
const maxSize = 2 * 1024 * 1024; //2MB

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let savePath = path.join(dirname(require.main?.filename!)+"/../public/uploads/");
        cb(null, savePath);
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
    }
})

let uploadFile = multer({
    storage: storage,
    limits: {fileSize: maxSize},
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
export default uploadFileMiddleware;
