var app= angular.module('codetodevelop',['ui.router']);
app.config(function($stateProvider,$urlRouterProvider,$locationProvider){
	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(true);
	$stateProvider
	.state('mainpage',{
			url: '/',
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
	.state('javaCode',{
		url:'/Code-Java',
		templateUrl:'./templates/javaCode.html',
		controller:'javaCodeController'
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
	.state('css_practise',{
		url:'/css_practise',
		templateUrl: './templates/css_practise.html',
		controller: 'css_practiseController'
	})
})

app.controller('mainpageController',function($scope,$rootScope,$state){

	$rootScope.gotoRMC=function(){
		/*if($rootScope.loggedIn==true)
		{
			$state.go('readymadecode');
		}
		else{
			console.log("hehu");
			$state.go('signin');
		}*/
		$state.go('readymadecode');
	}
	$rootScope.gotoPrac=function(){
		if($rootScope.loggedIn==true)
		{
			$state.go('practice');
		}
		else{
			$state.go('signin');
		}
	}
	$rootScope.gotoTUT=function(){
		if($rootScope.loggedIn==true)
		{
			$state.go('');
		}
		else{
			$state.go('signin');
		}
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
app.controller('readymadecodeController',function($scope,$rootScope,$state,$http){

	$scope.javaCode=function(){
		$rootScope.code_type="java";
		$state.go("javaCode");
	}

})
app.controller('javaCodeController',function($state,$http,$scope,$rootScope){
	$scope.click=1;
	if($rootScope.code_type=="java")
	{
		$http({
		method:'POST',
		url:'http://localhost:8080/code/getjavaHeading',
		data:{
			code_type:$rootScope.code_type
			}
		}).then((response)=>{
			$scope.javaCodeHeading=response.data;
			console.log($scope.javaCodeHeading);
			
		})

		$scope.getCode=function(){	
			
			$http({
				method:'POST',
				url:'http://localhost:8080/code/getdesiredCode',
				data:{
					heading:"base class"
				}
			}).then((response)=>{
				console.log(response.data.codeContent);
				$scope.javaCode=response.data.codeContent;
			})
		}
	}
	
	
})

app.controller('signupController',function($scope,$rootScope,$http){

	$scope.signup=function(){
		$http({
			method:'POST',
			url:'http://localhost:8080/register/usersignup',
			data:{
				email:$scope.signupMail,
				fullname:$scope.signupName,
				password:$scope.signupPass,
				confirm_password:$scope.signupCpass
			}
		}).then((res)=>{
			console.log(res);
		})
	}
})

app.controller('signinController',function($scope,$rootScope,$http,$state){
	$scope.signin=function(){
		$http({
			method:'POST',
			url:'http://localhost/register/usersignin',
			data:{
				email:$scope.signinMail,
				password:$scope.signinPass
			}
		}).then((res)=>{
			console.log(res);
			if($scope.signinPass==res)
			{
				$state.go('tips');
				$rootScope.loggedIn=true;
			}

			else
			{
				$scope.signinError="Email-id or password doesn't match"
			}
		})
	}
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

	$scope.second=function(){
		$scope.CSSPageOne=true;
		$scope.CSSPageTwo=false;
		$scope.CSSPageThree=false;

		$http({
			method:'GET',
			url: 'http://localhost:8000/cssques/getFirst5CssQues'
		}).then(function(response){
			console.log(response.data);
			$rootScope.FirstPageQuestions=response.data;
			console.log($rootScope.FifthPageQuestions);
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

//css practise
app.controller('css_practiseController',function($scope,$rootScope,$http){

	$scope.CSSPageOne=true;
	$scope.CSSPageTwo=false;
	$scope.CSSPageThree=false;

	$scope.firstCSSPage=function(){
		$scope.CSSPageOne=true;
		$scope.CSSPageTwo=false;
		$scope.CSSPageThree=false;

		$http({
			method:'GET',
			url: 'http://localhost:8000/cssques/getFirst5CssQues'
		}).then(function(response){
			console.log(response.data);
			$scope.FirstPageQuestions=response.data;
		})
	}

	$scope.secondCSSPage=function(){
		$scope.CSSPageOne=false;
		$scope.CSSPageTwo=true;
		$scope.CSSPageThree=false;

		$http({
			method: 'GET',
			url: 'http://localhost:8000/cssques/getSecond5CssQues'
		}).then(function(response){
			console.log(response.data);
			$scope.SecondPageQuestions=response.data;
		})
	}

	$scope.thirdCSSPage=function(){
		$scope.CSSPageOne=false;
		$scope.CSSPageTwo=false;
		$scope.CSSPageThree=true;

		$http({
			method: 'GET',
			url: 'http://localhost:8000/cssques/getThird5CssQues'
		}).then(function(response){
			console.log(response.data);
			$scope.ThirdPageQuestions=response.data;
		})
	}
})