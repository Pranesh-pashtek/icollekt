module.exports = function (sequelize, Sequelize) {
    const followers = sequelize.define('followers', {

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: true,
            primaryKey: true
        },
        from_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            reference: {
                module: 'users',
                key: 'id'
            }
        },
        to_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            reference: {
                module: 'users',
                key: 'user_id'
            }
        },
        status: {
            type: Sequelize.INTEGER,
            allowNull: true
        },

    }, {
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
    // followers.sync()
    return followers
}