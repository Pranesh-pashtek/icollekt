module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define(
        "countries",
        {
  
          id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
                autoIncrement: true,
          },

            code:{
                type: Sequelize.STRING,                
                allowNull: false
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false               
            },

            status: {
              type: Sequelize.INTEGER ,
              allowNull: false 
          },
        
            
        },
        { timestamps: false }
    );
  
    return Country;
  };