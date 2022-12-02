module.exports = (sequelize, Sequelize) => {
    const Policies = sequelize.define(
        "policies",
        {
  
          id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
                autoIncrement: true,
          },

            name:{
                type: Sequelize.STRING,                
                allowNull: false
            },

            content: {
                type: Sequelize.TEXT,
                allowNull: false               
            },

           
            
        },
        { timestamps: false }
    );
  
    return Policies;
  };