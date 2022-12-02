module.exports = (sequelize, Sequelize) => {
    const Staff = sequelize.define(
        "staffs",
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
           email: {
            type: Sequelize.STRING,
            allowNull: false        
             },
            mobile_no:{
                type: Sequelize.INTEGER,
                allowNull : false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false        
           },
           role: {
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
  
    return Staff;
  };