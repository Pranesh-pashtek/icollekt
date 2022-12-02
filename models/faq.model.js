module.exports = (sequelize, Sequelize) => {
  const Faqs = sequelize.define(
      "faqs",
      {

        id:{
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        question: {
              type: Sequelize.STRING,              
              allowNull: false
          },        
          answer: {
            type: Sequelize.STRING,
            allowNull: false           
        },
        status: {
          type: Sequelize.INTEGER,
          allowNull: false             
      },
         
          
      },
      { timestamps: false }
  );

  return Faqs;
};