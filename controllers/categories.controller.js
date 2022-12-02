const database = require("../config/db.sequalize");
const Categories = database.categories;



exports.findAll = (req, res) => {


    Categories.findAll
        (
            // {attributes:["id","title"],
            // where:{title: "men"}}
        )
        .then(data => {
            res.send(data);
        })

}
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Categories.findByPk(id)
      .then(data => {
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
        parent_id: req.body.parent_id,
        level: req.body.level,
        name: req.body.name,
        order_level: req.body.order_level,
        commision_rate: req.body.commision_rate,
        banner: req.body.banner,
        icon: req.body.icon,
        featured: req.body.featured,
        top: req.body.top,
        digital: req.body.digital,
        slug: req.body.slug,
        meta_title: req.body.meta_title,
        meta_description: req.body.meta_description

    };

    await Categories.create(userData)
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err);
            return res.status(500).json(err)
        });


}

exports.delete = (req, res) => {


    Categories.destroy(
        { where: { id: req.params.id } })
        .then(() => {
            res.send("success");
        })
}


exports.update = (req, res) => {

    Categories.update(
        {
            parent_id: req.body.parent_id,
            level: req.body.level,
            name: req.body.name,
            order_level: req.body.order_level,
            commision_rate: req.body.commision_rate,
            banner: req.body.banner,
            icon: req.body.icon,
            featured: req.body.featured,
            top: req.body.top,
            digital: req.body.digital,
            slug: req.body.slug,
            meta_title: req.body.meta_title,
            meta_description: req.body.meta_description,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at
        },
        { where: { id: req.body.id } })
        .then((data) => {
            res.send(data);
        })

}