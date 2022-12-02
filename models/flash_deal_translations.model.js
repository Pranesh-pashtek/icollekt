module.exports = (sequelize, Sequelize) => {
    const flash_deal_translations = sequelize.define(
        "flash_deal_translations",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            flash_deal_id: {
                type: Sequelize.INTEGER,
                allowNull: false

            },
            title: {
                type: Sequelize.STRING,
                allowNull: false

            },

           
            lang: {
                type: Sequelize.STRING,
                allowNull: false

            },

        },
        {
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    return flash_deal_translations;
};