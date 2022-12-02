const database = require("../config/db.sequalize");
const Faq = database.faq;



// exports.findAll = (req,res) => {    
//     Faq.findAll
//     (
//     // {attributes:["id","title"],
//     // where:{title: "men"}}
//     )
// .then(data => {
//     res.send({data});
// })

// }



// FindAll
exports.findAll = (req, res) => {
    Faq.findAll(
      {
        attributes: ['id', 'question', 'answer', 'status', 'created_at', 'updated_at'],
      }
      )
      .then(data => {
        res.send({data});
      })
  }




// Create

exports.create = async(req,res) => {
    const userData = {
        question: req.body. question,
        answer:req.body.answer,
        status:1,
      };
 await Faq.create(userData)
.then(data => {
    res.send(data);
}).catch(err => {
    console.log( err);
    return res.status(500).json(err)
  });


}