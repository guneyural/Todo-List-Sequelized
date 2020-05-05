'use strict';
module.exports = (sequelize, DataTypes) => {
  const todo = sequelize.define('todo', {
    item: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  todo.associate = function(models) {
    todo.belongsTo(models.user, {
      foreignKey: "userId",
      as: 'user',
      onDelete: 'CASCADE'
    });
  };
  return todo;
};