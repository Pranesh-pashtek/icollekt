module.exports = (sequelize, Sequelize) => {
    const makeOffer = sequelize.define("makeoffers", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true
        },
        product_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        buyer_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        seller_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        make_price: {
            type: Sequelize.DOUBLE(20, 2),
            allowNull: true
        },
        original_price: {
            type: Sequelize.DOUBLE(20, 2),
            allowNull: true
        },
        status: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    );
    return makeOffer
}