module.exports = (sequelize, DataTypes) => {
  const tbl_Messages = sequelize.define("tbl_Messages", {
    Name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return tbl_Messages;
};
