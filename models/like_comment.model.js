module.exports = (sequelize, Sequelize) => {
    const Like_comments = sequelize.define(
        "like_comments",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true

            },
            post_id: {
                type: Sequelize.INTEGER,
                allowNull: true

            },
            comment_id: {
                type: Sequelize.INTEGER,
                allowNull: true

            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: true

            },
            likecount: {
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

    return Like_comments;
};