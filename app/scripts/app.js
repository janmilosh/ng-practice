'use strict';

angular.module('app', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('app')
  .directive('slideOutButton', [function slideOutFactory() {
    return {
      link: function (scope, ele) {
        var slideOut = $('#slideout');
        ele.click(function () {
          slideOut.slideToggle(1000);
        });
        $(window).resize(function() {
          if($(window).width() < 767) {
            slideOut.css('display', 'none');
          } else {
            slideOut.css('display', 'block');
          }
        });
      }
    };
  }])
  .directive('putCopyrightHere', [function copyRight() {
    return {
      link: function() {
        var date = new Date().getFullYear();
        $('footer p').html(' Jan Milosh &copy;' + date);
      }
    };
  }])
  .directive('go', [function toFooter() {
    return {
      link: function (scope, ele) {
        ele.click(function(){
          $.scrollTo($('footer'), 750);
        });
      }
    };
  }])
  .directive('fixedMenu', [function fixedMenu() {
    return {
      link: function (scope) {
        var width = $(window).width();
        var offset = $('nav').offset().top;
        $('nav').waypoint(function(direction){
          if(direction === 'down' && offset <= 10){
            $('nav').css({
              'position': 'fixed',
              'top': '0',
              'z-index': 1,
              'width': width
            });
          }
          if(direction === 'up'){
            $('nav').css({
              'position': 'relative',
              'left': 0
            });
          }
        });
        scope.$on('$routeChangeStart', function(){
          $.waypoints('destroy');
        });
        $(window).resize(function() {
          $.waypoints('destroy');
          $('nav').css({
            'position': 'relative',
            'left': 0,
            'width': '100%'
          });
        });
      }
    };
  }]);

  



 