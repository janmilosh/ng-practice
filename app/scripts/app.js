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

// function news($http) { 
//   $http({method: 'GET', url: 'http://jan.cyberkitty.net/?json=get_recent_posts'}).
//     success(function(data, status, headers, config) {
//       console.log("It worked!!");
//       // this callback will be called asynchronously
//       // when the response is available
//     }).
//     error(function(data, status, headers, config) {
//       console.log("There's been an error!!!");
//       // called asynchronously if an error occurs
//       // or server returns response with an error status.
//     });
// }

angular.module('app')
  .directive('slideOutButton', [function slideOutFactory() {
    return {
      link: function (scope, ele) {
        var slideOut = $('.slideout');
        var button = $('.slide-out-button');
        
        ele.click(function () {
          $(this).closest('.slideout-segment')
            .children('.slideout')
            .slideToggle(1000);
          ele.toggleClass('opened');
        });
        $(window).resize(function() {
           button.removeClass('opened');
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
        $('.copyright').html(' Jan Milosh &copy;' + date);
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

  



 