Nhs-Choices-Angular
===================

Angular front-end for the Nhs Choices/Conditions DB
- Converts all urls to ajax calls
- Sanitizes Html and Xml from the Nhs server
- Uses the Angular Seed project
- Does not require JQuery

Requirements
- Requires a /config.php file that looks like;
<?php $apikey = '<your nhs key>'; ?>
- Requires Bower to fetch the dependencies (npm install will do
- Swap angular.js for angular.min.js in the index.html file for production
