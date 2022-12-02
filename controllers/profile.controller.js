const database = require("../config/db.sequalize");
const Profiles = database.users;
const sharp = require('sharp');
const compressImages = require('compress-images')
var Jimp = require('jimp');
const path = require('path');
const fs = require('fs');
const resizeImg = require('resize-image-buffer');
// const fs = require('fs');
// const { profile } = require("console");
// const request = require('request');
// const imagemin = require("imagemin");
// const imageminMozjpeg = require("imagemin-mozjpeg");

//Profile Findall
exports.findAll = (req, res) => {
  Profiles.findAll()
    .then(Profiles => {
      res.send({ Profiles });
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id;

  Profiles.findByPk(id)
    .then((data) => {
      console.log(data, "data");
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id"
      });
    });
};


exports.create = async (req, res) => {
  const userData = {
    name: req.body.name,
    password: req.body.password,
  };
  await Profiles.create(userData)
    .then(data => {
      res.send(data);
    }).catch(err => {
      console.log(err);
      return res.status(500).json(err)
    });
}

exports.tokenupdate = async (req, res) => {
  const userData = {
    device_token: req.body.device_token
  };
  await Profiles.create(userData)
    .then(data => {
      res.send(data);
    }).catch(err => {
      console.log(err);
      return res.status(500).json(err)
    });
}

exports.delete = (req, res) => {
  Profiles.destroy(
    { where: { id: req.body.id } })
    .then(() => {
      res.send("deleted")
    })

}


// Profile image upload
// exports.new = async (req, res, body) => {
//   const id = req.params.id;
//   const data = `http://localhost:3001/profile/${req.file.filename}`;
//   Jimp.read(data, (err, profile) => {
//     if (err) throw err;
//     profile
//       .resize(1080, 720) // resize
//       .quality(90) // set JPEG quality
//       .write(`./upload/profile_images/${req.file.filename}`); // save
//   });
//   Profiles.update({
//     profile_pic: `http://localhost:3001/profile/${req.file.filename}`,
//     status: 1
//   }, { where: { id: id } }).then(user => {
//     console.log(user)
//     res.json(
//       {
//         success: true,
//         profile_pic_url: `http://localhost:3001/profile/${req.file.filename}`
//       }
//     );
//   }).catch(err => {
//     res.status(200).json(err);
//   })

// }

// const b64 = Buffer.from(req.file.filename).toString('base64');
//    gm(`http://localhost:3001/profile/${req.file.filename}`)
// .resize(240, 240)
// .noProfile()
// .write('./upload/profile_images/resize.png', function (err,info) {
//   if (err) console.log(info);
// });

// const files = await imagemin([req.file.originalname], {
//   destination: './upload/profile_images',
//   plugins: [
//     imageminMozjpeg({quality: 50})
//   ]
// });
// console.log(files,"sssssss");
// console.log(req.file.originalname, "lllll")
// sharp('Zlatan-Ibrahimovic-PNG-Transparent-Image.png')
// .rotate(180)
// .resize(200)
// .toBuffer()
// .then( data1 => {
//   console.log(data1,"data11");
//     fs.writeFileSync('Zlatan-Ibrahimovic-PNG-Transparent-Image.png', data1);
// })
// .catch( err => {
//     console.log(err);
// });
// sharp(req.file.b64)
//   .resize(100)
//   .toBuffer()
//   .then(data1 => {
//     console.log(data1, "kkkkk");
//     // Throws Input buffer contains unsupported image format error.
//   })
// sharp(req.file.originalname).resize(680,480).jpeg({
//   quality:80,
//   chromaSubsampling:'4:4:4'
// }).then((data1)=>{
//   console.log(data1,"ooooo");
//   res.send(data1)
// }
// )
// var buf = Buffer.from(req.file.path);

// console.log(buf, "mmmmmmmmmm");

// var sharpImage = sharp(bitmap.data, {
//   raw: {
//     height: bitmap.height,
//     width: bitmap.width,
//     channels: 4
//   }
// });
// // const buffer = await req.get(req.file.originalname, { encoding: null });
//const fileBuffer = Buffer.from(data, 'base64')
// console.log(fileBuffer,"llllllllllll");

// const imageUrl = 'https://padlet-uploads.storage.googleapis.com/12/0b15e5f2187ce2339481741cacca9176/BMP_Image.bmp'
// request({ uri: data, encoding: null }, async (error, response, body) => {
//   const img = sharp(body)
//   const outputBuffer = img.toBuffer()
//   console.log(outputBuffer, " outputBuffer");
//   

//  fs.writeFileSync(images.filename, data1);


//});
// Banner image upload
// exports.upload = (req, res) => {
//   let url = [];
//   const id = req.params.id;
//   console.log(req.files.length, "req.files.filename");
//   // const data = `http://localhost:3001/profile/${req.files.filename}`
//   req.files.map((images, index) => {
//     console.log(images, "image");
//     const data = " '" + ("http:///i-collekt.jksoftec.com:3001/banner/") + (images.filename) + "' ";
//     if (images.size <= 102400) {
//       url.push(data);
//     } else {
//       res.send("image must be less than 100kb")
//     }
//   });
//   console.log(url, "url");
//   Profiles.update(
//     {
//       banner_img: url,
//       status: 1,
//     },
//     { where: { id: id } }
//   )
//     .then((err) => {
//       console.log(err);
//       res.status(200).json({
//         status: true,
//         success: "Image Uploaded Sucessfully",
//         banner_url: url,
//       });
//     })
// };

// About 

exports.about_findOne = (req, res) => {
  const id = req.params.id;
  console.log(id, 'data')
  Profiles.findOne(
    {
      attributes: ["id", "date_of_birth", "address", "status", "phone", "user_collection", "aboutme"],
      where: { id: id }
    }
  )
    .then(data => {
      res.send(data);
    })
};

exports.editUsername = (req, res) => {
  const name = req.body.name
  Profiles.update(
    {
      name: name
    },
    { where: { id: req.params.id } })
    .then((data) => {
      if (name == "") {
        return res.status(200).send({
          result: false,
          message: "please type unique username",
          name: ""
        });
      } else {
        return res.status(200).send({
          result: true,
          message: "username is changed successfully",
          name: name
        });
      }
    })
}

// Deleting Profile_image
exports.delete_profile_img = (req, res) => {
  const id = req.body.id
  Profiles.findOne({
    attributes: ["id", "profile_pic"],
    where: {
      id: id
    }
  }).then((data) => {
    let url = data.profile_pic;
    let filename = url.split('/').pop();
    let profile = filename.replace(/['"]+/g, '')
    fs.unlink(`./upload/profile_images/${profile}`, function (err) {
      if (err) throw err;
      console.log('File deleted!');
    });

    Profiles.update(
      { profile_pic: null },
      {
        where: { id: req.body.id }
      }).then(() => {
        res.json({
          status: "success"
        });
      })

  })
}

// Deleting Banner_image
exports.delete_banner = (req, res) => {
  const id = req.body.id;
  Profiles.findOne({
    attributes: ["id", "banner_img"],
    where: {
      id: id
    }
  }).then((user) => {
    let url = user.banner_img;
    let filename = url.split('/').pop();
    let banner_images = filename.replace(/['"]+/g, '')

    fs.unlink(`./upload/banner_images/${banner_images}`, function (err) {
      if (err) throw err;
      console.log('File deleted!');
    });
    Profiles.update(
      { banner_img: null },
      { where: { id: id } }
    )
      .then((order) => {
        res.json({
          status: "success"
        });
      })
      .catch((err) => {
        res.status(200).json(err);
      });
  })
}

// Banner image upload
exports.upload = (req, res) => {
  const id = req.params.id;
  const data = `http://localhost:3001/banner/${req.file.filename}`;

  Profiles.findOne({
    attributes: ["id", "banner_img"],
    where: {
      id: id
    }
  }).then((user) => {

    if (user.banner_img !== null) {
      let url = user.banner_img;
      let filename = url.split('/').pop();
      let bannerimg = filename.replace(/['"]+/g, '')

      fs.unlink(`./upload/banner_images/${bannerimg}`, function (err) {
        if (err) throw err;
        console.log('File deleted!');
      });
      Profiles.update({
        banner_img: data,
        status: 1
      }, { where: { id: id } }).then(user => {
        res.json(
          {
            success: true,
            banner_img_url: `http://localhost:3001/banner/${req.file.filename}`
          }
        );
      }).catch(err => {
        res.status(200).json(err);
      })
    } else {
      Profiles.update({
        banner_img: data,
        status: 1
      }, { where: { id: id } }).then(user => {
        res.json(
          {
            success: true,
            banner_img_url: `http://localhost:3001/banner/${req.file.filename}`
          }
        );
      }).catch(err => {
        res.status(200).json(err);
      })
    }
  })
}

// Profile image controller upload
exports.new = (req, res) => {
  const id = req.params.id;
  const data = `http://localhost:3001/profile/${req.file.filename}`

  Profiles.findOne({
    attributes: ["id", "profile_pic"],
    where: {
      id: id
    }
  }).then((user) => {
    if (user.profile_pic !== null) {
      let url = user.profile_pic;
      let filename = url.split('/').pop();
      let profile = filename.replace(/['"]+/g, '');

      fs.unlink(`./upload/profile_images/${profile}`, function (err) {
        if (err) throw err;
        console.log('File deleted!');
      });

      Profiles.update({
        profile_pic: data,
        status: 1
      }, { where: { id: id } }).then(user => {
        res.json(
          {
            success: true,
            profile_pic_url: `http://localhost:3001/profile/${req.file.filename}`
          }
        );
      }).catch(err => {
        res.status(200).json(err);
      })
    } else {
      Profiles.update({
        profile_pic: data,
        status: 1
      }, { where: { id: id } }).then(user => {
        res.json(
          {
            success: true,
            profile_pic_url: `http://localhost:3001/profile/${req.file.filename}`
          }
        );
      }).catch(err => {
        res.status(200).json(err);
      })
    }
  })
}

/////////
exports.usertype_update = (req, res) => {
  Profiles.update(
    {
      user_type: req.body.user_type,
    },
    { where: { id: req.body.id } })
    .then((data) => {
      res.send({
        "message": "sucess",
        "status": true
      });
    })
}