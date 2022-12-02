const multer = require("multer");
const path = require("path");
const express = require("express");
var app = express();
// const { MulterError } = require("multer");


const storage = multer.diskStorage({
    destination: './upload/banner_images',
    // destination: './upload/home_images',

    filename: (req, file, cb) =>{

        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
    
})




const uploads = multer({
    storage: storage,
//  limits: {fileSize: 1024 * 1800}
})

module.exports=uploads;







// cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
// cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0])