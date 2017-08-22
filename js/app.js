var app= angular.module('codetodevelop',['ui.router']);
app.config(function($stateProvider,$urlRouterProvider,$locationProvider){
	$urlRouterProvider.otherwise('/mainpage');
	$locationProvider.html5Mode(true);
	$stateProvider
	.state('mainpage',{
			url: '/mainpage',
			templateUrl: './templates/mainpage.html',
			controller: 'mainpageController'
	})
	.state('tips',{
		url:'/tips',
		templateUrl:'./templates/tips.html',
		controller:'tipsController'
	})
	.state('readymadecode',{
		url:'/readymadecode',
		templateUrl:'./templates/readymadecode.html',
		controller:'readymadecodeController'
	})
})
app.controller('mainpageController',function($scope){
	console.log("hello");

	$('.slide2').hide();
	$('.slide3').hide();
	function call()
	{
		$('.slide1').fadeIn(3000,function(){
			$('.slide1').fadeOut(5000,function(){
				$('.slide2').fadeIn(3000,function(){
					$('.slide2').fadeOut(2000,function(){
						$('.slide3').fadeIn(1000,function(){
							$('.slide3').fadeOut(2000,function(){
								call();
							})
						})
					})
				})
			})
		})
	}
	call();

	/*$scope.show_div=false;
	$scope.display=function(){
		$scope.show_div=true;
		$('.menu_btn').hide();
	}

	$scope.close_menu=function(){
		$scope.show_div=false;
		$('.menu_btn').show();
	}*/
})

app.controller('tipsController',function($scope,$rootScope)
{
	
	
})
app.controller('readymadecodeController',function($scope,$rootScope){

})