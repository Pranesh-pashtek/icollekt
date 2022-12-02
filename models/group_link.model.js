module.exports = (sequelize, Sequelize) => {
  const  Group_link = sequelize.define(
    "group_links",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      group_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      device_token: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: "created_at",
      updated_at: "updated_at",
    },
    { timestamps: false }
  );

  return Group_link;
};
