const database = require("../config/db.sequalize");
const Settings = database.settings;
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

//create

exports.create = (req,res) => {
    Settings.create({
      // id:id,
      chat_notification:req.body.chat_notification,
      delivery_ststus:req.body.delivery_ststus,
      my_collections_notification:req.body.my_collections_notification,
      icollekt_updates:req.body.icollekt_updates,
     
   }).then(user=>{
    
     res.json(user);
   }).catch(err=>{
     res.status(500).json(err);
   })
   }

//chat_notification: chat_notification,
// delivery_ststus: delivery_ststus,
// my_collections_notification: my_collections_notification,
// icollekt_updates: icollekt_updates,