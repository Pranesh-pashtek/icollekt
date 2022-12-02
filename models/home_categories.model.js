module.exports = (sequelize, Sequelize) => {
    const Home_categories = sequelize.define(
        "home_categories",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            category_id: {
                type: Sequelize.INTEGER,
                allowNull: false

            },
            
            subsubcategories: {
                type: Sequelize.STRING,
                allowNull: false

            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false

            },
           
        },
        {
            timestamps: false,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    return Home_categories;
};