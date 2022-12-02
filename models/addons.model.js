module.exports = (sequelize, Sequelize) => {
    const Addons = sequelize.define(
        "addons",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false        
           },
           unique_identifier: {
                type: Sequelize.STRING,
                allowNull: false
           },
           version: {
                type: Sequelize.STRING,
                allowNull: false
             },
         activated: {
                type: Sequelize.INTEGER,
                allowNull: false
           },
           image: {
                type: Sequelize.STRING,
                allowNull: false
             },
            purchase_code:{
                type: Sequelize.STRING,
                allowNull: false
            },
        // Timestamps
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
        },        
             
        { timestamps: false }
    );
  
    return Addons;
  };