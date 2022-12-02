module.exports = (sequelize, Sequelize) => {
    const Events = sequelize.define(
        "events",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            event_name: {
                type: Sequelize.STRING,
                allowNull: false
               
            },

            start_date: {
                type: Sequelize.STRING,
                allowNull: false
               
            },
           end_date: {
                type: Sequelize.STRING,
                allowNull: false
               
            },
            offer_percentage: {
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
  
    return Events;
  };