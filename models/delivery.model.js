module.exports = (sequelize, Sequelize) => {
    const Delivery = sequelize.define(
        "deliveries",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            item_name: {
                type: Sequelize.STRING,
                allowNull: false
            
            },
            item_no: {
                type: Sequelize.INTEGER,
                allowNull: false
               
            },
                delivery_status: {
                type: Sequelize.INTEGER,
                allowNull: false
               
            },
        },        
             
        { timestamps: false }
    );
  
    return Delivery;
  };