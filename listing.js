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
    var name = document.getElementById("item_name").value;
    var name = document.getElementById("category").value;
    var start_dollar = document.getElementById("start_price_one").value;
    var start_cents = document.getElementById("start_price_two").value;
    //var data = "name=" + name + "&lastname=" + last_name + "&userid=" + userid;

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
	    alert(serverText);
	    if (serverText =="email") {
	        var div = document.getElementById('message')
	        div.className = "alert alert-warning";
	        div.innerHTML = "This email already exists. Please register a new one";
	    }
	    else {
	        var div = document.getElementById('message')
	        div.className = "alert alert-warning";
	        div.innerHTML = "An unkown error occurred, please try again";
	    }
  
    }
}