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
	.state('signup',{
		url:'/signup',
		templateUrl:'./templates/signup.html',
		controller:'signupController'
	})
	.state('signin',{
		url:'/signin',
		templateUrl:'./templates/signin.html',
		controller:'signinController'
	})
	.state('practise',{
		url:'/practise',
		templateUrl: './templates/practise.html',
		controller: 'practiseController'
	})
	.state('html_practise',{
		url: '/html_practise',
		templateUrl: './templates/html_practise.html',
		controller: 'html_practiseController'
	})
})
app.controller('mainpageController',function($scope,$http){
	console.log("hello");

	$('.slide2').hide();
	$('.slide3').hide();
	$('.slide4').hide();
	function call()
	{
		$('.slide1').fadeIn(3000,function(){
			$('.slide1').fadeOut(5000,function(){
				$('.slide2').fadeIn(3000,function(){
					$('.slide2').fadeOut(2000,function(){
						$('.slide3').fadeIn(1000,function(){
							$('.slide3').fadeOut(2000,function(){
								$('.slide4').fadeIn(2000,function(){
									$('.slide4').fadeOut(2000,function(){
										call();
									})
								})
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

	$scope.showFrontEndTips=function()
	{
		$http({
			method: 'POST',
			url: 'http://localhost:8000/tip_submit/getFrontEndTips',
			data: {
				tip_language: 'Web Frontend'
			}
		}).then(function(response){
			console.log(response.data);
			$scope.frontEndTip=response.data;
		})
	}
})

//added know
app.controller('tipsController',function($scope,$rootScope,$http)
{
	$scope.tipsaved=false;
	$scope.save_tips=function()
	{
		alert("save tips callde");
		$http({
			method: 'POST',
			url: 'http://localhost:8000/tip_submit/submit_tip',
			data: {
				tip_heading: $scope.tip_heading,
				tip_content: $scope.tip_content,
				tip_language: $scope.tip_language,
				author_name: $scope.author_name
			}
		}).then(function(response){
			$scope.tipsaved=true;
			console.log(response);
			console.log("tip saved");
			$scope.tip_language=null;
			$scope.tip_heading=null;
			$scope.tip_content=null;
			$scope.author_name=null;
		});
	}
	
	$scope.showFrontEndTips=function()
	{
		$http({
			method: 'POST',
			url: 'http://localhost:8000/tip_submit/getFrontEndTips',
			data: {
				tip_language: 'Web Frontend'
			}
		}).then(function(response){
			console.log(response.data);
			$scope.frontEndTip=response.data;
		})
	}

	$scope.showBackEndTips=function(){
		console.log("showBackEndTips called");

		$http({
			method: 'POST',
			url: 'http://localhost:8000/tip_submit/getBackEndTips',
			data: {
				tip_language: 'Web Backend'
			}
		}).then(function(response){
			console.log(response.data);
			$scope.backEndTip=response.data;
		})
	}

	$scope.javaTips=function(){
		console.log("javaTips called");

		$http({
			method: 'POST',
			url: 'http://localhost:8000/tip_submit/getJavaTips',
			data: {
				tip_language: 'java'
			}
		}).then(function(response){
			console.log(response.data);
			$scope.javaTip=response.data;
		})
	}
})
//add finished
app.controller('readymadecodeController',function($scope,$rootScope){

})

app.controller('signupController',function($scope,$rootScope){

})

app.controller('signinController',function($scope,$rootScope){

})

//changed now
app.controller('practiseController',function($scope,$rootScope,$http){
	console.log('practiseController callde');
	$scope.first= function(){
		alert("firstPage called");
		console.log("hello");
		$scope.PageOne=true;
		$scope.PageTwo=false;
		$scope.PageThree=false;
		$scope.PageFour=false;
		$scope.PageFive=false;

		console.log("hello");
		$http({
			method:'GET',
			url: 'http://localhost:8000/htmlques/getFirst5Ques'
		}).then(function(response){
			console.log(response.data);
			$rootScope.ques=response.data;
			console.log($rootScope.ques);
		})
	}
})

//add fiished
//addeed now
app.controller('html_practiseController',function($scope,$rootScope,$http){
	
	console.log("html_practiseController called");

	$scope.PageOne=true;
	$scope.PageTwo=false;
	$scope.PageThree=false;
	$scope.PageFour=false;
	$scope.PageFive=false;

	$scope.firstPage= function(){
		alert("hello");
		$scope.PageOne=true;
		$scope.PageTwo=false;
		$scope.PageThree=false;
		$scope.PageFour=false;
		$scope.PageFive=false;
		$http({
			method:'GET',
			url: 'http://localhost:8000/htmlques/getFirst5Ques'
		}).then(function(response){
			console.log(response.data);
			$scope.ques=response.data;
		})
	}

	$scope.secondPage=function(){
		alert("hello");
		$scope.PageOne=false;
		$scope.PageTwo=true;
		$scope.PageThree=false;
		$scope.PageFour=false;
		$scope.PageFive=false;
		$http({
			method: 'GET',
			url: 'http://localhost:8000/htmlques/getSecond5Ques'
		}).then(function(response){
			console.log(response.data);
			$scope.SecondPageQuestions=response.data;
		})
	}

	$scope.thirdPage=function(){
		alert("hello");
		$scope.PageOne=false;
		$scope.PageTwo=false;
		$scope.PageThree=true;
		$scope.PageFour=false;
		$scope.PageFive=false;
		$http({
			method: 'GET',
			url: 'http://localhost:8000/htmlques/getThird5Ques'
		}).then(function(response){
			console.log(response.data);
			$scope.ThirdPageQuestions=response.data;
		})
	}

	$scope.fourthPage=function(){
		$scope.PageOne=false;
		$scope.PageTwo=false;
		$scope.PageThree=false;
		$scope.PageFour=true;
		$scope.PageFive=false;
		
		$http({
			method: 'GET',
			url: 'http://localhost:8000/htmlques/getFourth5Ques'
		}).then(function(response){
			console.log(response.data);
			$scope.FourthPageQuestions=response.data;
		})		
	}

	$scope.fifthPage=function(){
		$scope.PageOne=false;
		$scope.PageTwo=false;
		$scope.PageThree=false;
		$scope.PageFour=false;
		$scope.PageFive=true;
		
		$http({
			method: 'GET',
			url: 'http://localhost:8000/htmlques/getFifth5Ques'
		}).then(function(response){
			console.log(response.data);
			$scope.FifthPageQuestions=response.data;
		})
	}
})

//add finish