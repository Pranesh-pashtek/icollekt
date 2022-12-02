module.exports = (sequelize, Sequelize) => {
    const Hashtags = sequelize.define(
        "hashtags",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false

            },
            created_at: 'created_at',
            updated_at: 'updated_at',
            deleted_at: 'deleted_at'

        },
        {
            timestamps: false,
        }
    );

    return Hashtags;
};