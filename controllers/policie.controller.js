const database = require("../config/db.sequalize");
const Policie = database.policie;


//findall
exports.findAll = (req,res) => {
    Policie.findAll(
  {attributes:["id","name","content","created_at","updated_at"],
  }
    )
.then(data => {
    res.send(data);
})}

//Findone

exports.findOne = (req, res) => {
    const id = req.params.id;
  console.log(id,'data')
  Policie.findOne({where:{id:id}}).then(data => {
        res.send(data);
      })
  };





