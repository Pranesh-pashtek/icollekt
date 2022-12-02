const database = require("../config/db.sequalize");
const Coins = database.user_posts;


exports.findAll = (req, res) => {
    Coins.findAll(
        {
            attributes: ["id", "user_id", "image_upload", "hashtags", "title", "price", "max_price", "min_price", "updated_at", "created_at", "status"]
        }
    )
        .then(data => {
            res.send(data);
        })
}

