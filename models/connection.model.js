module.exports = (sequelize, Sequelize) => {
  const Connection = sequelize.define("connections", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    user_one: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user_two: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
},
);

  return Connection;
};
