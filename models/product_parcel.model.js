module.exports = (sequelize, Sequelize) => {
    const Messages_inboxs = sequelize.define(
        "parcels",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            weight: {
                type: Sequelize.STRING,
                allowNull: true
            }, 
            height: {
                type: Sequelize.STRING,
                allowNull: true
            },
            width: {
                type: Sequelize.STRING,
                allowNull: true
            },
            length: {
                type: Sequelize.STRING,
                allowNull: true
            },
            product_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            user_id: {
                type: Sequelize.INTEGER,
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