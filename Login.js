var xHRObject = false;

if(window.XMLHttpRequest)
{
	xHRObject = new XMLHttpRequest();
}
else if (window.ActiveXObject)
{
    xHRObject = new ActiveXObject("Microsoft.XMLHTTP");
}


function sendData()
{
    var userid = document.getElementById("user_name").value;
    var password = document.getElementById("password").value;
    var data = "userid=" + userid + "&password=" + password;

	xHRObject.open("GET","login.php?" + data , true);
	xHRObject.setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00 GMT' );
    xHRObject.onreadystatechange = recData;
    xHRObject.send(null); 
}

function recData()
{
	if (xHRObject.readyState == 4 && xHRObject.status == 200)
    {
	    var serverText = xHRObject.responseText;
	    if (serverText == 1) {

	    	var div = document.getElementById('message')
	        div.className = "alert alert-success";
	        div.innerHTML = "Login successful. Please wait";

	      	setTimeout(function(){

        		// Move to a new location
        		location.href = "bidding.htm";

    		}, 3000);
	    }
	    else
	    {
	    	  var div = document.getElementById('message')
	        div.className = "alert alert-warning";
	        div.innerHTML = "Invalid email and password";
	    }
  
    }
}