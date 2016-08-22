<?php

session_start(); // Starting Session

$login = false; //Default set to false for security
$match = false;

if (isset($_GET['userid']) && isset($_GET['password'])) {

	$username=$_GET['userid'];
	$password=$_GET['password'];


//xml settings
$url = '../../data/customer.xml';


//load the xml file
if(file_exists($url))
{
    $doc = DOMDocument::load($url);

    $xml_email = $doc->getElementsByTagName('email');
	$xml_password = $doc->getElementsByTagName('password');

	foreach ($xml_email as $xml_email) 
	{
		if ($xml_email->nodeValue == $username	) 
		{
				$match=true;	
		}
	}
	if ($match==true) 
	{
	
		foreach ($xml_password as $xml_password) 
		{
			if ($xml_password->nodeValue == $password	) 
				{
					$login = true;	
				}
		}
	}
} 
}
else 
{
    $login = false;
}

echo $login;

?>