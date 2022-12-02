module.exports = (sequelize, Sequelize) => {
    const Group_image = sequelize.define(
      "group_users",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        subject: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        group_image: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        group_banner: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        message: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        creater_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        group_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        status: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      { timestamps: false }
    );
  
    return Group_image;
  };
  