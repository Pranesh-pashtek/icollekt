module.exports = (sequelize, Sequelize) => {
    const City = sequelize.define(
        "cities",
        {
  
            id:{
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                    autoIncrement: true,
              },

            country_id:{
                type: Sequelize.INTEGER,                
                allowNull: false
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false               
            },

            cost: {
              type: Sequelize.DOUBLE(20,2) ,
              allowNull: false 
          },
          
           
            
        },
        { timestamps: false }
    );
  
    return City;
  };