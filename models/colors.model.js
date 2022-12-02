module.exports = (sequelize, Sequelize) => {
    const Colors = sequelize.define(
        "colors",
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
           code: {
            type: Sequelize.STRING,
            allowNull: false        
         },
           // Timestamps
           created_at: Sequelize.DATE,
           updated_at: Sequelize.DATE,
        },        
             
        { timestamps: false }
    );
  
    return Colors;
  };