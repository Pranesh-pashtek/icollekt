module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define(
        "reviews",
        {
  
          id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
                autoIncrement: true,
          },

          product_id:{
                type: Sequelize.INTEGER,                
                allowNull: false
            },

            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false               
            },
            rating: {
                type: Sequelize.INTEGER,
                allowNull: false               
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: false               
            },
            status:{
                type:Sequelize.INTEGER,
                allowNull:false
            },
            viewed: {
                type: Sequelize.INTEGER,
                allowNull: false               
            },

            created_at: 'created_at',
            updated_at: 'updated_at',
            deleted_at: 'deleted_at'
           
            
        },
        { timestamps: false }
    );
  
    return Review;
  };