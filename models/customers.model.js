module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define(
        "customers",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false        
               },
     // Timestamps
     created_at: Sequelize.DATE,
     updated_at: Sequelize.DATE,
     },
             
        { timestamps: false }
    );
  
    return Customer;
  };