import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const category = (sequelize) => {
  const category = sequelize.define("category", {
    title: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return category;
};

export default category;
