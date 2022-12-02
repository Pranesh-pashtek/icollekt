const database = require("../config/db.sequalize");
const Customerfeedback = database.customerfeedback;



exports.findAll = (req,res) => {
  Customerfeedback.findAll
    (
   
    )
.then(data => {
    res.send(data)
})

}
exports.findOne = (req, res) => {
    const id = req.params.id;
  
   Customerfeedback.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving user with id" 
        });
      });
  };
  

exports.create = async(req,res) => {
    const userData = {
       
        customername: req.body.customername,
        customeremail:req.body.customeremail,
        comment:req.body.comment,
        ratings:req.body.ratings,
        status:req.body.status
        
      };
    
 await Customerfeedback.create(userData)
.then(data => {
    res.send(data);
}).catch(err => {
    console.log( err);
    return res.status(500).json(err)
  });


}

exports.delete = (req, res) => {

    Customerfeedback.destroy(
  
      { where: { id: req.body.id } })
  
      .then(() => { res.send("deleted") })
  
  }
  
 

  exports.update = (req, res) => {

   Customerfeedback.update(
      {
      
        customername: req.body.customername,
        customeremail:req.body.customeremail,
        comment:req.body.comment,
        ratings:req.body.ratings,
        status:req.body.status
  
      },
      { where: { id: req.body.id } })
      .then((data) => {
        res.send(data);
      })
  
  }