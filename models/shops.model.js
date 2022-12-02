module.exports = (sequelize, Sequelize) => {
    const Shop = sequelize.define(
        "shops",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
           user_id: {
                type: Sequelize.STRING,
                allowNull: false        
           },
            name: {
                type: Sequelize.STRING,
                allowNull: false
                },
            Reg_no: {
                type: Sequelize.STRING,
                allowNull: false
                },
            address: {
                type: Sequelize.STRING,
                allowNull: false
                },
            email: {
                    type: Sequelize.STRING,
                    allowNull: false        
               },
            country_code: {
                type: Sequelize.STRING,
                allowNull: false
            },
            phno: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            Staff_name: {
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
  
    return Shop;
  };