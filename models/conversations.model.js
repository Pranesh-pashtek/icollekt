module.exports = (sequelize, Sequelize) => {
    const Conversation = sequelize.define(
        "conversations",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            group_id: {
                type: Sequelize.INTEGER,
                allowNull: false

            },
            fromUserId: {
                type: Sequelize.INTEGER,
                allowNull: false

            },
            message: {
                type: Sequelize.TEXT,
                allowNull: false

            },
            photos: {
                type: Sequelize.STRING,
                allowNull: true

            },
          
            like_post: {
                type: Sequelize.INTEGER,
                allowNull: true

            },
            like_users: {
                type: Sequelize.INTEGER,
                allowNull: true

            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: true

            },
        },
        {
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    return Conversation;
};