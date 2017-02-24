const APP_ORIGINAL_SEO_MAP = {
    title: "MyLysts",
    description: "Build Your Lists. Learn Something New. Build public & private nested lists of text, links, & images. Collaborate with others to build large lists."
}

const SERVER_API_KEY_PARAM = "apiKey=p8q937b32y2ef8sdyg"
const USE_DEV_USER = false
const DEV_LIST_ONE = {
	id: "housing-spots-98",
	title: "Housing Spots",
	description: "Housing spots in san francisco for 2016. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
	descriptionSnippet: "Housing spots in san francisco for 2016. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printe ...",
	numItems: 16,
	numTextItems: 3,
	numLinkItems: 10,
	numImageItems: 2,
	numListItems: 1,
	numViews: 624,
	numWatchers: 83,
	contributors: [
		{
			username: "lwdthe1",
			url: "/lister/lwdthe1"
		},
		{
			username: "tmcleod",
			url: "/lister/tmcleod"
		}
	]
}

String.prototype.contains = function(it) { return this.indexOf(it) > -1}

function _id(id) {
	return document.getElementById(id);
}


//a function for checking if a value is an array.
function isArray(arrayToCheck) {
	if( Object.prototype.toString.call( arrayToCheck ) === '[object Array]' ) {
	    return true;
	}
	return false;
}

const isEmptyArray = function (arr) {
	if(!isArray(arr)) return true
	return arr.length < 1
}

const forEachCachedLength = function(array, callback) {
	if(!isArray(array)) return false;
	if(!isFunc(callback)) throw new Error("forEach() requires callback function.")
	for (var i = 0, len = array.length; i < len; i++) {
		(function(i) {
			callback(array[i])
		}(i))
	}
}

function dispatchEvent(id, data) {
	var event
	if(data) event = new CustomEvent(id, { detail: data })
	else event = new Event(id)

	document.dispatchEvent(event);
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

const removeElementAtArrayIndex = function(array, index) {
	if (index > -1 && !isEmptyArray(array)) {
		var element = array[index]
    array.splice(index, 1);
		return element
	}
}

var DEV_USER = {
	accessToken: "2d70dadd763653dc95d8aaad73f64fdc450b39d0341f8399779d8baf225dc13f2",
	email:"",
	id:"1c29b2ac002e76ef24e6ef8be179c73b4f1a290ea0d5585edc98b828a571ec6f0",
	imageUrl:"https://d262ilb51hltx0.cloudfront.net/fit/c/200/200/1*g6LNd6Zq5qQHRk0vrFUfrA.png",
	mediumTokensExpMillis:"1478985812233",
	pubs:[],
	refreshToken:"2d0e1398937f2b31d0fe6624c4ffed8251a182ea225c7a6fa1f69ec09fc415590",
	url:"https://medium.com/@LincolnWDaniel",
	username:"LincolnWDaniel",
}

function loginGoogler(ngOpts, preLoginData) { 
	if(!ngOpts) return
	var $scope = ngOpts.scope
	var $window = ngOpts.window
	var $location = ngOpts.location
	var Google = ngOpts.Google
	NProgress.start();

	Google.sendToLogin(preLoginData).then(function(response) {
		if(response){
			//data binding not working
			$scope.loginStatus = "Redirecting to Google.com to login ...";
			$window.location.href = response.data;
		}
		NProgress.done();
	}, function(response) {
		//something went wrong
		console.log("[$scope.loginGoogler] ERROR:" + response);
		$scope.loginStatus = response;
		NProgress.done();
	});
}


function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a flash,
  // so some of these are just precautions. However in IE the element
  // is visible whilst the popup box asking the user for permission for
  // the web page to copy to the clipboard.
  //

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';


  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    //console.log('Copying text command was ' + msg + ": " + text);
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}