module.exports = (sequelize, DataTypes) => {
  const tbl_Volunteer = sequelize.define("tbl_Volunteer", {
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
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Contact_Time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Street: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    City: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    State: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Zip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Previously_Volunteered_Here: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Hear_About_Us: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Available_Days: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Interested_Areas: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Additional_Comments: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return tbl_Volunteer;
};
