module.exports = (sequelize, Sequelize) => {
    const Categories = sequelize.define(
        "sellers",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            seller_id: {
                type: Sequelize.STRING,
                allowNull: false
               
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
               
            },
           companyname: {
                type: Sequelize.STRING,
                allowNull: false
               
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false
               
            },
            number: {
                type: Sequelize.STRING,
                allowNull: false
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
           
            
        },
        { timestamps: false }
    );
  
    return Categories;
  };