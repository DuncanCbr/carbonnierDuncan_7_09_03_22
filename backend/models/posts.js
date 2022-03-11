module.exports = (sequelize, DataTypes) => {

    const Posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING, 
        },
        name: {
            type: DataTypes.STRING,
        },
        filename: {
            type: DataTypes.STRING,
        },
        data:  {
            type: DataTypes.BLOB("long"),
        },
    });


    return Posts
};