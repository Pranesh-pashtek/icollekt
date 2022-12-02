module.exports = (sequelize, Sequelize) => {
    const Banner = sequelize.define(
        "banners",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            photo: {
                type: Sequelize.STRING,
                allowNull: true               
            },
            org_image: {
                type: Sequelize.STRING,
                allowNull: true
            },
            position_type: {
                type: Sequelize.STRING,
                allowNull: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true
               
            },
            description: {
                type: Sequelize.STRING,
              allowNull: true
             
          },
          published: {
              type: Sequelize.INTEGER,
              allowNull: true             
          },          
        },
        { timestamps: false,
            created_at: 'created_at',
            updated_at: 'updated_at'
        } 
    );
  
    return Banner;
  };