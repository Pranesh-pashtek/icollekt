
module.exports = (sequelize, Sequelize) => {
    const Messages = sequelize.define(
        "messages",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
          
            fromUserId: {
                type: Sequelize.INTEGER,
                references:{
                  model: 'Users',
                  key: 'id'
                }
              },
              toUserId: {
                type: Sequelize.INTEGER,
                references:{
                  model: 'Users',
                  key: 'id'
                }
              },
              chat: {
                type: Sequelize.TEXT,
                allowNull: false
              },
              connectionId: {
                type: Sequelize.INTEGER,
                allowNull: false,
              },
              user1: {
                type: Sequelize.INTEGER,
                allowNull: true,
              },
              user2: {
                type: Sequelize.INTEGER,
                allowNull: true,
              },
              clearid: {
                type: Sequelize.INTEGER,
                allowNull: true,
              },
              user_one: {
                type: Sequelize.INTEGER,
                allowNull: true,
              },
              user_two: {
                type: Sequelize.INTEGER,
                allowNull: true,
              },

        },
        {
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    return Messages;
};
