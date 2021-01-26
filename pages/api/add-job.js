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
    const formData = req.body
    const name = saltedMd5(uploadLogo.name, "Let's-G0-S4Lting")
    const fileName = name + path.extname(uploadLogo.name)
    const file = bucket.file(fileName)
    file.createWriteStream().end(uploadLogo.data)
    const publicUrl = `https://storage.googleapis.com/job-board-20348.appspot.com/${fileName}`
    formData["publicUrl"] = publicUrl
    const response = await firebase.collection("jobs").doc().set(formData)
    res.send({status:200,message:"Done"})
}