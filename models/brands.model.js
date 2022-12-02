module.exports = (sequelize, Sequelize) => {
    const Brands = sequelize.define(
        "brands",
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
           logo: {
                type: Sequelize.STRING,
                allowNull: false
               
            },
            top: {
                type: Sequelize.INTEGER,
                allowNull: false
               
            },
            slug: {
                type: Sequelize.STRING,
                allowNull: false
               
            },
            meta_title: {
                type: Sequelize.STRING,
                allowNull: false
               
            },
            meta_description: {
                type: Sequelize.STRING,
                allowNull: false
               
            },
          
           
            
        },
        { timestamps: false,
            createdAt: 'created_at',
            updatedAt:'updated_at'
        }
    );
  
    return Brands;
  };