const database = require("../config/db.sequalize");
const Country = database.country;



exports.findAll = (req,res) => {
    Country.findAll(
  {attributes:["id","code","name","status","created_at","updated_at"],
  }
    )
.then(data => {
    res.send(data);
})}

//Findone

exports.findOne = (req, res) => {
    const code = req.params.code;
  console.log(code,'data')
  Country.findOne({where:{code:code}}).then(data => {
        res.send(data);
      })
  };
