const multer = require("multer");
const path = require("path");
const express = require("express");
var app = express();


const storage = multer.diskStorage({
    destination: './upload/group_images',
   

    filename: (req, file, cb) =>{

        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
    
})

const upload = multer({
    storage: storage,
//  limits: {fileSize: 1024 * 1800}
})

module.exports=upload;