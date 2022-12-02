module.exports = (sequelize, Sequelize) => {
  const Group_image = sequelize.define(
    "group_images",
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
      user_list: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      admin_list: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      // accept: {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // },
      // decline: {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // },
    },
    { timestamps: false }
  );

  return Group_image;
};
