const database = require("../config/db.sequalize");
const Review = database.review;



exports.findAll = (req,res) => {
    Review.findAll(
  {attributes:["id","product_id","user_id","rating","comment", "status", "viewed", "created_at", "updated_at"],
  }
    )
.then(data => {
    res.send(data);
})}

//Findone

exports.findOne = (req, res) => {
    const id = req.params.id;
  console.log(id,'data')
  Review.findOne({where:{id:id}}).then(data => {
        // console.log('Hai')
        res.send(data);
      })
  };

//create

exports.create = async(req,res) => {
  const userData = {
    product_id: req.body.product_id,
    user_id: req.body.user_id,
    rating:req.body.rating,
    comment:req.body.comment,
    viewed:req.body.viewed,
      status:1
      // updated_at:req.body.updated_at,
      
    };
  
await Review.create(userData)
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
    product_id: req.body.product_id,
    user_id: req.body.user_id,
    rating:req.body.rating,
    comment:req.body.comment,
    viewed:req.body.viewed,
    };
    Review.update(
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
  Review.update({status:0},{where: {id:req.body.id}})
      .then((order) => {
        res.json("success");
      })
      .catch((err) => {
        res.status(500).json(err);
      });

}