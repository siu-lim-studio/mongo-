'use strict'
/**
 * The module define and exports all routes
 * @module       : <% this.name %>Model
 * @author       : Jean luc deshayes
 *  
 *
 */
const routes = [
 <% for(index in this){%>
  require('./routes/<% this[index].name %>'),
 <%}%>
];

// Add access to the app and db objects to each route

module.exports = function router(_router,db) {
  return routes.forEach((route) => {
    route(_router,db);
  });
};