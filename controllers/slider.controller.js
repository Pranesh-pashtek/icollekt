const database = require("../config/db.sequalize");
const Slider = database.slider;


//Findall

exports.findAll = (req,res) => {
    Slider.findAll(
  {attributes:["id","photo","published","link","created_at","updated_at"],
  }
    )
.then(data => {
    res.send(data);
})}

//Findone

exports.findOne = (req, res) => {
    const id = req.params.id;
  console.log(id,'data')
  Slider.findOne({where:{id:id}}).then(data => {
        res.send(data);
      })
  };



//create

exports.create = async(req,res) => {
    const userData = {
        id: req.body.id,
        photo: req.body.photo,
        published: req.body.published,
        link:req.body.link,
        status:1
        // updated_at:req.body.updated_at,
        
      };
    
 await Slider.create(userData)
.then(data => {
    res.send(data);
}).catch(err => {
    console.log( err);
    return res.status(500).json(err)
  });
}



//update

exports.update = async(req,res) => {
  const userData = {
    photo:req.body.photo,
    url:req.body.url,
    position:req.body.position,
    published:req.body.published,
    };
    Slider.update(
      userData,
      { where: { id: req.body.id } })
      .then((data) => {
        res.send(data);
      })
  .catch(err => {
  console.log( err);
  return res.status(500).json(err)
});
}


//delete

exports.delete = (req,res) => {
  Slider.update({status:0},{where: {id:req.body.id}})
      .then((order) => {
        res.json("success");
      })
      .catch((err) => {
        res.status(500).json(err);
      });

}
