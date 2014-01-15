var gateways, remote;

angular.element(document).ready(function() {
  angular.module( 'ripplecharts', [
    'templates-app',
    'templates-common',
    'ripplecharts.landing',
    'ripplecharts.markets',
    'ripplecharts.multimarkets',
    'ripplecharts.accounts',
    'ui.state',
    'ui.route',
    'snap'
  ])
  
  .config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
    $urlRouterProvider.otherwise( '/' );
  })
  
  .run( function run () {
  })
  
  .controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
    $scope.theme = store.get('theme') || Options.theme;
    $scope.$watch('theme', function(){store.set('theme', $scope.theme)});
    
    $scope.snapOptions = {
      disable: 'right',
      maxPosition: 267
    }
    
    //disable touch drag for desktop devices
    if (!Modernizr.touch) $scope.snapOptions.touchToDrag = false;
    
        
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      if ( angular.isDefined( toState.data.pageTitle ) ) {
        $scope.pageTitle = toState.data.pageTitle + ' | Ripple Charts' ;
      }
    });
  });
  
  //load gateways file before starting the app
  d3.json("assets/gateways.json", function(error, data) {
    gateways = data;
        
    //connect to the ripple network;
    remote = new ripple.Remote(Options.ripple);
    remote.connect();

    angular.bootstrap(document, ['ripplecharts']);
  });
});
