module.exports = (sequelize, Sequelize) => {
    const Group_request = sequelize.define(
        "group_requests",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            group_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            admin_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            group_names: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            user_profile: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            // status: {
            //     type: Sequelize.INTEGER,
            //     allowNull: true,
            // },
            group_image: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            // decline: {
            //   type: Sequelize.STRING,
            //   allowNull: true,
            // },
        },
        {
            timestamps: false,
            created_at: 'created_at',
            updated_at: 'updated_at'
        }
    );

    return Group_request;
};
