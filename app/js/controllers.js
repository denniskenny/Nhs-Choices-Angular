'use strict';

angular.module('nhsApp.controllers', [])
  .controller('choicesController', ['$scope', 'nhsApiService', '$sce', function($scope, nhsApiService, $sce) {
 	
 		var initialLetter = 'a',
 			condition = '',
 			detail = '',
	 		detailRegex      = /\w+\?/,
	 		/* Scrape the necessary keywords from the Urls so we can use an Ajax fetch */
 			letterUrlRegex   = /(http:\/\/v1\.syndication\.nhschoices\.nhs\.uk\/conditions\/articles\/)(\S+)\?/,
	 		contentUrlRegex  = /(http:\/\/v1\.syndication\.nhschoices\.nhs\.uk\/conditions\/articles\/)(\S+)\?/,
 	  	    conditionUrlRegex = /http:\/\/v1\.syndication\.nhschoices\.nhs\.uk\/conditions\/articles\/(\S+)\/(\S+)\?/;
 	  	    	  	    	    	
    	var getLetter = function(letter) {
    		
	    	nhsApiService.getLetter(letter).success(function (response) {	        	
	        	$scope.letterContent = response;
	        	condition = response[0].Uri.match(letterUrlRegex)[2];
		    	getContent(condition);
    		});
    	};
    	   	
    	var getContent = function(condition) {
    		
			nhsApiService.getCondition(condition).success(function (response) { 	
	        	$scope.conditions = response;
	        	detail = response[0].Uri.match(detailRegex)[0].slice(0, -1);
	        	getCondition(condition, detail); 
	    	}); 
    	};
    	
    	var getCondition = function(condition, detail) {
    			
        	nhsApiService.getXmlDetail(condition, detail).success(function (response) {       		
        		/* Nhs return a 200 status with an error message in the content for some condition details, e.g Q Fever Diagnosis */
        		var content = '<h3>There is no content for this section.</h3>';
        		if(response.indexOf("technical difficulties") < 0) {	        	
	        		var xml = getParser()(response);	
	        		content = xml.getElementsByTagName("content")[0].nodeValue || xml.getElementsByTagName("content")[0].textContent;
	        	}
	        	$scope.details = $sce.trustAsHtml(content);
	    	}); 	
    	};
 	
    	/* http://stackoverflow.com/questions/7949752/cross-browser-javascript-xml-parsing */ 
    	var getParser = function(){
    		
    		var parseXml;
			if (typeof window.DOMParser != "undefined") {
			    parseXml = function(xmlStr) {
			        return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
			    };
			} else if (typeof window.ActiveXObject != "undefined" &&
			       new window.ActiveXObject("Microsoft.XMLDOM")) {
			    parseXml = function(xmlStr) {
			        var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
			        xmlDoc.async = "false";
			        xmlDoc.loadXML(xmlStr);
			        return xmlDoc;
			    };
			} else {
			    throw new Error("No XML parser found");
			}
			return parseXml;
    	};

    	$scope.onLetterClicked = getLetter;
    	
    	$scope.onContentClicked = function(condition){   
    		 		
        	condition = condition.match(contentUrlRegex)[2];    	
        	getContent(condition);	
    	};
    	
      	$scope.onConditionClicked = function(uri) {
      		      		
  			var params = uri.match(conditionUrlRegex);
			var condition = params[1];				
			var detail = params[2];		
      		getCondition(condition, detail); 
      	};
 	
  	    nhsApiService.getLetters().success(function (response) {
  	    	
        	$scope.letters = response;
    	});
    	    	
        getLetter(initialLetter);  	
  }]);