
module.exports = (sequelize, Sequelize) => {
    const Purchase = sequelize.define(
        "purchases",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            product: {
                type: Sequelize.STRING,
                allowNull: false
               
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false
               
            },
           price: {
                type: Sequelize.INTEGER,
                allowNull: false
               
            },
           
            status: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
           
            
        },
        { timestamps: false }
    );
  
    return Purchase;
  };