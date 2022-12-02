module.exports = (sequelize, Sequelize) => {
  const Settings = sequelize.define(
    "settings",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    //   notification_title: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
      delivery_ststus: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      chat_notification: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      my_collections_notification: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      icollekt_updates: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Settings;
};
