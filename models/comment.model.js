module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define(
        "comments",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            group_id: {
                type: Sequelize.INTEGER,
                allowNull: true

            },

            post_id: {
                type: Sequelize.INTEGER,
                allowNull: false

            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false

            },

            comment: {
                type: Sequelize.STRING,
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

    )
    return Comment;
}