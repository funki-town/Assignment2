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
    var name = document.getElementById("name").value;
    var last_name = document.getElementById("last_name").value;
    var data = "name=" + name + "&lastname=" + last_name + "&userid=" + userid;

	xHRObject.open("GET","register.php?" + data , true)
	xHRObject.setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00 GMT' );
    xHRObject.onreadystatechange = recData;
    xHRObject.send(null); 
}

function recData()
{
	if (xHRObject.readyState == 4 && xHRObject.status == 200)
    {
	    var serverText = xHRObject.responseText;
	    if (serverText =="email") {
	        var div = document.getElementById('message')
	        div.className = "alert alert-warning";
	        div.innerHTML = "This email already exists. Please register a new one";
	    }

	    if (serverText ==1)
	    {
	    	 var div = document.getElementById('message')
	        div.className = "alert alert-success";
	        div.innerHTML = "Registration successful, please check your email. Redirecting";
	        setTimeout(function(){

        		// Move to a new location 
        		location.href = "bidding.htm";

    		}, 3000);
	    }

	    if (serverText =="")
	    {
	    	  var div = document.getElementById('message')
	        div.className = "alert alert-warning";
	        div.innerHTML = "FOR TESTING PURPOSES. Their is a problem with your logic";
	    }
  
    }
}