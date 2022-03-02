module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        googleId: {
            type: Sequelize.STRING,
            required: true
        },
        displayName: {

            type: Sequelize.STRING,
            //unique: true,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING,
            required:true
        },

        lastName: {
            type: Sequelize.STRING,
            required:true
        },



        image:{
            type:Sequelize.STRING
        },


        email:{
            type: Sequelize.STRING,
            required:true
        }
        // },
        // isdeleted:{
        //     type:Sequelize.BOOLEAN,
        //     defaultValue: false

        // },
        // isActive:{
        //     type:Sequelize.BOOLEAN,
        //     defaultValue: false
        // }

    })
    return User;


}