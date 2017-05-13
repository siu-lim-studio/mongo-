'use strict'

const routes = [
 
  require('./routes/Bear'),
 
];

// Add access to the app and db objects to each route

module.exports = function router(_router,db) {
  return routes.forEach((route) => {
    route(_router,db);
  });
};