module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define(
        "products",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true
            },
            added_by: {
                type: Sequelize.STRING,
                allowNull: true,
                default: "admin"
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            category_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            brand_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            photos: {
                type: Sequelize.JSON,
                allowNull: true
            },
            thumbnail_img: {
                type: Sequelize.STRING,
                allowNull: true
            },
            org_img: {
                type: Sequelize.STRING,
                allowNull: true
            },
            video_provider: {
                type: Sequelize.STRING,
                allowNull: true
            },
            video_link: {
                type: Sequelize.STRING,
                allowNull: true
            },
            tags: {
                type: Sequelize.STRING,
                allowNull: true
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },

            unit_price: {
                type: Sequelize.DOUBLE,
                allowNull: true
            },

            purchase_price: {
                type: Sequelize.DOUBLE,
                allowNull: true
            },
            variant_product: {
                type: Sequelize.INTEGER,
                allowNull: true
            },

            attributes: {
                type: Sequelize.STRING,
                allowNull: true
            },
            choice_options: {
                type: Sequelize.TEXT,
                allowNull: true
            },

            colors: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            variations: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            todays_deal: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            published: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            approved: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            stock_visibility_state: {
                type: Sequelize.STRING,
                allowNull: true
            },
            cash_on_delivery: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            featured: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            seller_featured: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            current_stock: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            unit: {
                type: Sequelize.STRING,
                allowNull: true
            },
            min_qty: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            low_stock_quantity: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            discount: {
                type: Sequelize.DOUBLE,
                allowNull: true
            },
            discount_type: {
                type: Sequelize.STRING,
                allowNull: true
            },
            discount_start_date: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            discount_end_date: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            tax: {
                type: Sequelize.DOUBLE,
                allowNull: true
            },
            tax_type: {
                type: Sequelize.STRING,
                allowNull: true
            },
            shipping_type: {
                type: Sequelize.STRING,
                allowNull: true
            },
            shipping_cost: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            is_quantity_multiplied: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            est_shipping_days: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            num_of_sale: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            meta_title: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            meta_description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            meta_img: {
                type: Sequelize.STRING,
                allowNull: true
            },
            pdf: {
                type: Sequelize.STRING,
                allowNull: true
            },
            slug: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            rating: {
                type: Sequelize.DOUBLE,
                allowNull: true
            },
            barcode: {
                type: Sequelize.STRING,
                allowNull: true
            },
            digital: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            auction_product: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            file_name: {
                type: Sequelize.STRING,
                allowNull: true
            },
            file_path: {
                type: Sequelize.STRING,
                allowNull: true
            },
            external_link: {
                type: Sequelize.STRING,
                allowNull: true

            },
            product_type: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            share_count: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            likecount: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            thismonth_like: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            thisyear_like: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            thisweek_like: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            end_date: {
                type: Sequelize.STRING,
                allowNull: true
            },
            hashtags: {
                type: Sequelize.STRING,
                allowNull: true
            },
            seller_address: {
                type: Sequelize.STRING,
                allowNull: true
            },


            // Timestamps
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
        },

        { timestamps: false }
    );

    return Product;
};