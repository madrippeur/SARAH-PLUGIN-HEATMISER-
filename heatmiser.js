exports.action = function(data, callback, config, SARAH){
	var url="";

	config = config.modules.heatmiser;
	if (config.IP == "[FIXME]"){
		console.log("La variable IP n'est pas configurée");
		return callback({'tts' : "La variable, IP, n'est pas configurée."});
	}

	if (config.Port == "[FIXME]"){
		console.log("La variable Port n'est pas configuree");
		return callback({'tts' : "La variable, Port, n'est pas configurai."});
	}

	if (config.Utilisateur == "[FIXME]"){
		console.log("La variable Utilisateur n'est pas configuree");
		return callback({'tts' : "La variable, Utilisateur, n'est pas configurai."});
	}

	if (config.passe == "[FIXME]"){
		console.log("La variable Mot de passe n'est pas configuree");
		return callback({'tts' : "La variable, Mot de passe, n'est pas configurai."});
	}		

	//REGLAGE TEMPERATURE
  //dabord on sassure de cocher la case pour changer le reglage.
  if ( data.commande == 'settemp' ){
    if ( typeof data.action == 'undefined'){
      callback({'tts':'Pas de température à paramétrer'}); return;}

    var querystring = require('querystring');  
		var http = require('http');  
  
    var post_domain = config.IP;  
		var post_port = 80;  
		var post_path = '/basicset.htm';  
  
		var post_data = querystring.stringify({  
      'ovca' : 1,
      'hdca' : 0,
      'ovdt': 0
    	});  
  
		var post_options = {  
  		host: post_domain,  
  		port: post_port,  
  		path: post_path,
      auth:  config.Utilisateur + ':' + config.passe,
  		method: 'POST',  
  		headers: {  
  	  	'Content-Type': 'application/x-www-form-urlencoded',  
  	  	'Content-Length': post_data.length  
  		}  
		};  
  
		var post_req = http.request(post_options, function(res) {  
		  res.setEncoding('utf8');  
		  res.on('data', function (chunk) {});
		});  
		// write parameters to post body  
		post_req.write(post_data);  
		post_req.end();
  //pour moi, on recupére aussi un fichier sur le serveur
  //http://maison.caiveau.fr/sarah/heatmiser/html/reglage-manuel.php
    var url = 'http://maison.caiveau.fr/sarah/heatmiser/html/reglage-manuel.php';
  var request = require('request');
  request({ 'uri' : url , method: "POST"}, function (err, response, body){});
   	callback({'tts': 'Température réglée à ' + data.action + ' degrés !' });
 	}
//ENVOI DE LA TEMP
  if ( data.commande == 'settemp' ){
    if ( typeof data.action == 'undefined'){
      callback({'tts':'Pas de température à paramétrer'}); return;}

    var querystring = require('querystring');  
		var http = require('http');  
  
    var post_domain = config.IP;  
		var post_port = 80;  
		var post_path = '/basicset.htm';  
  
		var post_data = querystring.stringify({  
  		'tvrd' : data.action,
      'ovca' : 1,
      'hdca' : 0,
      'ovdt': 0
    	});  
  
		var post_options = {  
  		host: post_domain,  
  		port: post_port,  
  		path: post_path,
      auth:  config.Utilisateur + ':' + config.passe,
  		method: 'POST',  
  		headers: {  
  	  	'Content-Type': 'application/x-www-form-urlencoded',  
  	  	'Content-Length': post_data.length  
  		}  
		};  
  
		var post_req = http.request(post_options, function(res) {  
		  res.setEncoding('utf8');  
		  res.on('data', function (chunk) {
		  });  
		});  
		// write parameters to post body  
		post_req.write(post_data);  
		post_req.end();
  //pour moi, on recupére aussi un fichier sur le serveur
  //http://maison.caiveau.fr/sarah/heatmiser/html/reglage-manuel.php
    var url = 'http://maison.caiveau.fr/sarah/heatmiser/html/reglage-manuel.php';
  var request = require('request');
  request({ 'uri' : url , method: "POST"}, function (err, response, body){});
   	//callback({'tts': 'Température réglée à ' + data.action + ' degrés !' });
 	}
	//VEROUILLAGE DEVEROUILLAGE THERMOSTAT
  if (( data.commande == 'ver' ) || ( data.commande == 'dever' )){
    if ( data.commande == 'ver'){
      data.commande = "0";
      tts='Thermostat en position été !';
    } else {
      if ( data.commande == 'dever'){
      	data.commande = "1";
        tts='Thermostat en position hivers !';
      }
    }
      

    var querystring = require('querystring');  
		var http = require('http');  
  
    var post_domain = config.IP;  
		var post_port = 80;  
		var post_path = '/basicset.htm';  
  
		var post_data = querystring.stringify({  
  		'ovca' : data.commande,
      'hdca' : 0,
      'ovdt': 0
    	});  
  
		var post_options = {  
  		host: post_domain,  
  		port: post_port,  
  		path: post_path,
      auth:  config.Utilisateur + ':' + config.passe,
  		method: 'POST',  
  		headers: {  
  	  	'Content-Type': 'application/x-www-form-urlencoded',  
  	  	'Content-Length': post_data.length  
  		}  
		};  
  
		var post_req = http.request(post_options, function(res) {  
		  res.setEncoding('utf8');  
		  res.on('data', function (chunk) {
		  });  
		});  
		// write parameters to post body  
		post_req.write(post_data);  
		post_req.end();
  	callback({'tts': tts });
 	}
  //HOLD TEMP AVEC TEMPS DONNE
  if ( data.commande == 'holdtemp' ){  
    var querystring = require('querystring');  
		var http = require('http');  
  
    var post_domain = config.IP;  
		var post_port = 80;  
		var post_path = '/basicset.htm';  
  
		var post_data = querystring.stringify({ 
      'ovca' : 2,
      'hdca' : 1,
      'hldt' : 1,
  		'hdSt' : data.action,
      'hdhr': data.hour,
      'hdmi' : data.min,
      'kylk' : 0
    });  
  //ovca=2&hdca=1&hldt=1&hdSt=11&hdhr=01&hdmi=30&kylk=0
		var post_options = {  
  		host: post_domain,  
  		port: post_port,  
  		path: post_path,
      auth:  config.Utilisateur + ':' + config.passe,
  		method: 'POST',  
  		headers: {  
  	  	'Content-Type': 'application/x-www-form-urlencoded',  
  	  	'Content-Length': post_data.length  
  		}  
		};  
  
		var post_req = http.request(post_options, function(res) {  
		  res.setEncoding('utf8');  
		  res.on('data', function (chunk) {
		  });  
		});  
		// write parameters to post body  
		post_req.write(post_data);  
		post_req.end();
    
      	callback({'tts': 'Température réglée à ' + data.action + ' degrés pendant ' + data.hour + ' heure et ' + data.min + ' minutes.' });

  }
}