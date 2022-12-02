const database = require("../config/db.sequalize");
const City = database.city;



exports.findAll = (req,res) => {
    City.findAll(
  {attributes:["id","country_id","name","cost","created_at","updated_at"],
  }
    )
.then(data => {
    res.send(data);
})}

//Findone

exports.findOne = (req, res) => {
    const id = req.params.id;
  console.log(id,'data')
  City.findOne({where:{id:id}}).then(data => {
        res.send(data);
      })
  };




