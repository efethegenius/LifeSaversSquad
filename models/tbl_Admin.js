module.exports = (sequelize, DataTypes) => {
  const tbl_Admin = sequelize.define("tbl_Admin", {
    FirstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SignOnName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    UserPassword: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return tbl_Admin;
};
