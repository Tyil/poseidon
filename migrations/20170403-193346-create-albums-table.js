const db = require("../app/api/models/index.js");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("albums", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      artistId: {
        type: Sequelize.INTEGER,
        references: {
          model: "artists",
          key: "id"
        }
      },
      mbid: {
        type: Sequelize.UUID
      },
      wanted: {
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
    return queryInterface.dropTable("albums");
  }
};

