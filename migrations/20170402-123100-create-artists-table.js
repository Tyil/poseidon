const db = require("../app/models/index.js");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("artists", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      mbid: {
        type: Sequelize.UUID
      },
      localName: {
        type: Sequelize.STRING
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("artists");
  }
};

