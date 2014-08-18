'use strict';

/* Services */

angular.module('nhsApp.services', [])
  .config(function($httpProvider){
	    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })
  .factory('nhsApiService', function($http) {

    var nhsAPI = {};

    nhsAPI.getLetters = function() {
      return $http({
        method: 'POST', 
        url: "../atozservice.php?requrl=http://v1.syndication.nhschoices.nhs.uk/conditions/atoz.json"
      });
    };
    
    nhsAPI.getLetter = function(letter) {
      return $http({
        method: 'POST', 
        url: "../atozservice.php?requrl=http://v1.syndication.nhschoices.nhs.uk/conditions/atoz/"+ letter + ".json"
      });
    };

    nhsAPI.getCondition = function(condition) {
      return $http({
        method: 'GET', 
        url: "../atozservice.php?requrl=http://v1.syndication.nhschoices.nhs.uk/conditions/articles/"+ condition + ".json"
      });
    };
    
    nhsAPI.getDetail = function(condition, detail) {
      return $http({
        method: 'GET', 
        url: "../atozservice.php?requrl=http://v1.syndication.nhschoices.nhs.uk/conditions/articles/" + condition + "/" + detail + ".html"
      });
    };
      
    /* Useful to avoid all the extra mark-up in the Html version */
    nhsAPI.getXmlDetail = function(condition, detail) {
      return $http({
        method: 'GET', 
        url: "../atozservice.php?requrl=http://v1.syndication.nhschoices.nhs.uk/conditions/articles/" + condition + "/" + detail + ".xml"
      });
    };
    
    return nhsAPI;
	});