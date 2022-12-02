const multer = require("multer");
const path = require("path");
const express = require("express");
var app = express();
// const { MulterError } = require("multer");


const storage  = multer.diskStorage({
    // destination: './upload/images',
    destination: './upload/collection',

    filename: (req, file, cb) =>{

        return cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
    
})


const upload = multer({
    storage: storage,
//  limits: {fileSize: 1024 * 1800}
})


module.exports=upload;




// cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
// cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0])