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
		$state.go('practice');
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
			url: 'http://localhost:8080/tip/getFrontEndTips',
			data: {
				tip_language: 'Web Frontend'
			}
		}).then(function(response){
			//console.log(response.data);
			$scope.frontEndTip=response.data;
		})
	}
})


//added know
app.controller('tipsController',function($scope,$rootScope,$http)
{
	$scope.click=1;
	$http({
			method: 'POST',
			url: 'http://localhost:8080/tip/getFrontEndTips',
			data: {
				tip_language: 'Web Frontend'
			}
		}).then(function(response){
			//console.log(response.data);
			$scope.frontEndTip=response.data;
		})
	$scope.tipsaved=false;
	$scope.save_tips=function()
	{
		//alert("save tips callde");
		$http({
			method: 'POST',
			url: 'http://localhost:8080/tip_submit/submit_tip',
			data: {
				tip_heading: $scope.tip_heading,
				tip_content: $scope.tip_content,
				tip_language: $scope.tip_language,
				author_name: $scope.author_name
			}
		}).then(function(response){
			$scope.tipsaved=true;
			//console.log(response);
			//console.log("tip saved");
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
			url: 'http://localhost:8080/tip/getFrontEndTips',
			data: {
				tip_language: 'Web Frontend'
			}
		}).then(function(response){
			//console.log(response.data);
			$scope.frontEndTip=response.data;
		})
	}

	$scope.showBackEndTips=function(){
		//console.log("showBackEndTips called");

		$http({
			method: 'POST',
			url: 'http://localhost:8080/tip/getBackEndTips',
			data: {
				tip_language: 'Web Backend'
			}
		}).then(function(response){
			//console.log(response.data);
			$scope.backEndTip=response.data;
		})
	}

	$scope.javaTips=function(){
		//console.log("javaTips called");

		$http({
			method: 'POST',
			url: 'http://localhost:8080/tip/getJavaTips',
			data: {
				tip_language: 'java'
			}
		}).then(function(response){
			//console.log(response.data);
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

	$http({
		method:'POST',
		url:'http://localhost:8080/code/getjavaHeading',
		data:{
			code_type:"java"
		}
	}).then((response)=>{
		$scope.headings=response.data;
		//console.log("hello"+$scope.headings[0].heading);
		$http({
			method:'POST',
			url:'http://localhost:8080/code/getdesiredCode',
			data:{
				heading:$scope.headings[0].heading
			}

		}).then((response)=>{
			//console.log(response.data.codeContent);
			$scope.javaCode=response.data;
			//console.log($scope.javaCode);
		})
	})

	$scope.getCode=function(value){	
		//console.log("value is "+value);
		$http({
			method:'POST',
			url:'http://localhost:8080/code/getdesiredCode',
			data:{
				heading:value
			}

		}).then((response)=>{
			//console.log(response.data.codeContent);
			$scope.javaCode=response.data;
			//console.log($scope.javaCode);
		})
	}
	
});

app.controller('signupController',function($scope,$rootScope,$http,$state){

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
			//console.log(res.data);
			if(res.data=="false")
			{
				alert("E-mail Id exists,Please Signup with different Id");
			}
			else if(res.data=="true")
			{
				$state.go('mainpage');
			}
			
		})
	}
})

app.controller('signinController',function($scope,$rootScope,$http,$state){
	$scope.signin=function(){
		$http({
			method:'POST',
			url:'http://localhost:8080/register/usersignin',
			data:{
				email:$scope.signinMail,
				password:$scope.signinPass
			}
		}).then((res)=>{
			//console.log(res.data);
			//console.log($scope.signinPass);
			if($scope.signinPass==res.data)
			{
				$state.go('tips');
				$rootScope.loggedIn=true;
			}

			else if($scope.signinPass!=res.data)
			{
				$scope.signinError="Email-id or password doesn't match"
			}
		})
	}
})

//changed now
app.controller('practiseController',function($scope,$rootScope,$http){
	//console.log('practiseController callde');
	$scope.first= function(){
		//alert("firstPage called");
		//console.log("hello");
		$scope.PageOne=true;
		$scope.PageTwo=false;
		$scope.PageThree=false;
		$scope.PageFour=false;
		$scope.PageFive=false;

		//console.log("hello");
		$http({
			method:'GET',
			url: 'http://localhost:8080/htmlques/getFirst5Ques'
		}).then(function(response){
			//console.log(response.data);
			$rootScope.ques=response.data;
			//console.log($rootScope.ques);
		})
	}

	$scope.second=function(){
		$scope.CSSPageOne=true;
		$scope.CSSPageTwo=false;
		$scope.CSSPageThree=false;

		$http({
			method:'GET',
			url: 'http://localhost:8080/cssques/getFirst5CssQues'
		}).then(function(response){
			//console.log(response.data);
			$rootScope.FirstPageQuestions=response.data;
			//console.log($rootScope.FifthPageQuestions);
		})
	}
})

//add fiished
//addeed now
app.controller('html_practiseController',function($scope,$rootScope,$http){
	
	//console.log("html_practiseController called");

	$scope.PageOne=true;
	$scope.PageTwo=false;
	$scope.PageThree=false;
	$scope.PageFour=false;
	$scope.PageFive=false;

	$scope.firstPage= function(){
		
		$scope.PageOne=true;
		$scope.PageTwo=false;
		$scope.PageThree=false;
		$scope.PageFour=false;
		$scope.PageFive=false;
		$http({
			method:'GET',
			url: 'http://localhost:8080/htmlques/getFirst5Ques'
		}).then(function(response){
			//console.log(response.data);
			$scope.ques=response.data;
		})
	}

	$scope.secondPage=function(){
		
		$scope.PageOne=false;
		$scope.PageTwo=true;
		$scope.PageThree=false;
		$scope.PageFour=false;
		$scope.PageFive=false;
		$http({
			method: 'GET',
			url: 'http://localhost:8080/htmlques/getSecond5Ques'
		}).then(function(response){
			//console.log(response.data);
			$scope.SecondPageQuestions=response.data;
		})
	}

	$scope.thirdPage=function(){
		
		$scope.PageOne=false;
		$scope.PageTwo=false;
		$scope.PageThree=true;
		$scope.PageFour=false;
		$scope.PageFive=false;
		$http({
			method: 'GET',
			url: 'http://localhost:8080/htmlques/getThird5Ques'
		}).then(function(response){
			//console.log(response.data);
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
			url: 'http://localhost:8080/htmlques/getFourth5Ques'
		}).then(function(response){
			//console.log(response.data);
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
			url: 'http://localhost:8080/htmlques/getFifth5Ques'
		}).then(function(response){
			//console.log(response.data);
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
			url: 'http://localhost:8080/cssques/getFirst5CssQues'
		}).then(function(response){
			//console.log(response.data);
			$scope.FirstPageQuestions=response.data;
		})
	}

	$scope.secondCSSPage=function(){
		$scope.CSSPageOne=false;
		$scope.CSSPageTwo=true;
		$scope.CSSPageThree=false;

		$http({
			method: 'GET',
			url: 'http://localhost:8080/cssques/getSecond5CssQues'
		}).then(function(response){
			//console.log(response.data);
			$scope.SecondPageQuestions=response.data;
		})
	}

	$scope.thirdCSSPage=function(){
		$scope.CSSPageOne=false;
		$scope.CSSPageTwo=false;
		$scope.CSSPageThree=true;

		$http({
			method: 'GET',
			url: 'http://localhost:8080/cssques/getThird5CssQues'
		}).then(function(response){
			//console.log(response.data);
			$scope.ThirdPageQuestions=response.data;
		})
	}
})