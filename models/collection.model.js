module.exports = (sequelize, Sequelize) => {
    const Collection = sequelize.define(
        "collections",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            image: {
                type: Sequelize.STRING,
                allowNull: true
            },
           share_count: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
           
            status: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            createdAt: 'created_at',
            updatedAt: 'updated_at'

        },
        {
            timestamps: true,
        }
    );

    return Collection;
};