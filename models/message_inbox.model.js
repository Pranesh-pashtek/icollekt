
module.exports = (sequelize, Sequelize) => {
    const Messages_inboxs = sequelize.define(
        "message_inboxs",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            from_id: {
                type: Sequelize.INTEGER,
                // references: {
                //     model: 'Users',
                //     key: 'id'
                // },
                allowNull: true
            },
            to_id: {
                type: Sequelize.INTEGER,
                // references: {
                //     model: 'Users',
                //     key: 'id'
                // },
                allowNull: true
            },
            chat: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            connectionId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            status1: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            status2: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            from_profile: {
                type: Sequelize.STRING,
                allowNull: true
            },
            to_profile: {
                type: Sequelize.STRING,
                allowNull: true
            },
            from_name: {
                type: Sequelize.STRING,
                allowNull: true
            }, 
            to_name: {
                type: Sequelize.STRING,
                allowNull: true
            },

        }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    );

    return Messages_inboxs;
};
