const fileUpload = require("express-fileupload")

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
    uploadLogo.mv("./uploads/" + uploadLogo.name)
    console.log(req.body)
    res.send({status:200,message:"Done"})
}