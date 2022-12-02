module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define(
        "likes",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: true
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true

            },
            post_id: {
                type: Sequelize.INTEGER,
                allowNull: true

            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: true

            },
            like_count: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            // like_users: {
            //     type: Sequelize.INTEGER,
            //     allowNull: true
            // },
            // status: {
            //     type: Sequelize.INTEGER,
            //     allowNull: true
            // },
        },
        {
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    return Like;
};