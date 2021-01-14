const fileUpload = require("express-fileupload")
const saltedMd5 = require("salted-md5")
const path = require('path');
import firebase, {bucket} from "../../lib/firebase"

export const config = {
    api: {
      bodyParser: false,
    },
  }

function runMiddleware(req, res, fn) {
return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
    if (result instanceof Error) {
        return reject(result)
    }

    return resolve(result)
    })
})
}

const fileupload = fileUpload({
    createParentPath: true
}

)
export default async function handler(req,res){
    await runMiddleware(req, res, fileupload)
    const {uploadLogo} = req.files
    const name = saltedMd5(uploadLogo.name, "Let's-G0-S4Lting")
    const fileName = name + path.extname(uploadLogo.name)
    await bucket.file(fileName).createWriteStream().end(uploadLogo.data)
    res.send({status:200,message:"Done"})
}