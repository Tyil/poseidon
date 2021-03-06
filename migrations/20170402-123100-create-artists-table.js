const db = require("../app/api/models/index.js");

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
      autoDownload: {
        type: Sequelize.BOOLEAN
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

