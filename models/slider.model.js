module.exports = (sequelize, Sequelize) => {
    const Slider = sequelize.define(
        "sliders",
        {
  
          id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
                autoIncrement: true,
          },

            photo:{
                type: Sequelize.STRING,                
                allowNull: false
            },

            published: {
                type: Sequelize.INTEGER,
                allowNull: false               
            },

            link: {
              type: Sequelize.STRING ,
              allowNull: false 
          },
          status: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
       
           
            
        },
        { timestamps: false }
    );
  
    return Slider;
  };