var _ = require('lodash');
const log = console.log;

var a = [{name:'user'},{name : 'group'}];

log(JSON.stringify(a,null,'  '));
var index =  _.findIndex(a, function(o) { return o.name == 'group'; });
_.update(a,'[' + index + '].name',function(){ return 'toto'});

log(JSON.stringify(a,null,'  '));

_.pullAllWith(a, [{ name: 'toto'}], _.isEqual);

log(JSON.stringify(a,null,'  '));
