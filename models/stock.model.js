module.exports = (sequelize, Sequelize) => {
    const Stock = sequelize.define(
        "stocks",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            product_name: {
                type: Sequelize.STRING,
                allowNull: false        
           },
            stock:{
                type: Sequelize.INTEGER,
                allowNull : false
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
        },        
             
        { timestamps: false }
    );
  
    return Stock;
  };