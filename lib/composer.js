var fs = require('fs');
var jetpack = require('fs-jetpack');

var config = {};

var pathToTemplate = config.pathToTemplate || ".";
var inputTemplate = config.inputTemplateFile || "input.tpl";
var outputTemplate = config.outputTemplateFile || "output.tpl";
var templateExtension = config.templateExtension || ".tpl";
var output = config.outputFile || "test.html";

function engine (template,options) {
     var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];', cursor = 0, match;
     var add = function(line, js) {  
        js? (code += line.match(reExp) ? line + '' : 'r.push(' + line + ');') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");' : '');
        return add;
     }
     var _template = template.replace(/\r/g,'\\r')
                             .replace(/\n/g,'\\n')
                             .replace(/\t/g,'\\t');
     while(match = re.exec(_template)) {
        add(_template.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
     }
     add(_template.substr(cursor, _template.length - cursor));
     code += 'return r.join("");';
     return new Function(code).apply(options);
}

module.exports = {
	build : function (input,output,options){
        console.log("options : " + JSON.stringify(options));
        var src = jetpack.cwd(input);
        console.log(src.path());
        console.log("input : " + input);
	    var data = jetpack.read(input,'utf8'),reg = /<#([^#>]+)?#>/g,tableaucorr=[];

	    while(tableaucorr = data.match(reg)){
	      var Path =  tableaucorr[0].replace(/<#|#>/g,"").trim() + templateExtension,
	          content = jetpack.read(Path,'utf8');
	      console.log("paths : " + Path);
	      data = data.replace(reg,content);
	    }
	    var templateOutput = pathToTemplate + "/" + outputTemplate,template="";
	    console.log("output path : " + templateOutput);
	    jetpack.file(templateOutput,{mode:700,content:data});
	    template = jetpack.read(templateOutput,'utf8'); 
	    var code = engine(template,options);
	    console.log("output file : " + output);
	    jetpack.file(output,{mode:700,content:code});
    },
    setConfig : function(conf){
        config.pathToTemplate = conf.pathToTemplate;
        config.outputFile = conf.outputFile;
    }
}