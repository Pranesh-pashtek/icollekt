module.exports = (sequelize, Sequelize) => {
    const Attributes = sequelize.define(
        "attributes",
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
        // Timestamps
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
        },        
             
        { timestamps: false }
    );
  
    return Attributes;
  };