module.exports = (sequelize, Sequelize) => {
    const Customerfeedback = sequelize.define(
        "customerfeedback",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            customername: {
                type: Sequelize.STRING,
                allowNull: false
               
            },
            customeremail: {
                type: Sequelize.STRING,
                allowNull: false
               
            },
            comment: {
                type: Sequelize.STRING,
                allowNull: false
               
            },
            ratings: {
                type: Sequelize.INTEGER,
                allowNull: false
               
            },
           
           status:{
               type:Sequelize.INTEGER,
               allowNull:false
           },
            
        },
        { timestamps: false }
    );
  
    return Customerfeedback;
  };