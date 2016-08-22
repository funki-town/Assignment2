<?php
session_start();

//preset registered variable to blank for error handling
$registered = false;
$error="";

//Get values from xhr object
if((isset ($_GET['name'])) && (isset($_GET['lastname'])) && (isset($_GET['userid'])))
{
  //create random password
  $password = uniqid();
  $name = $_GET['name'];
  $last_name = $_GET['lastname'];
  $email = $_GET['userid'];

}

//xml location
$url = '../../data/customer.xml';

//load the xml file
if(file_exists($url))
{
    $doc = DOMDocument::load($url);
    $root = $doc->documentElement;
} 
else 
{
  //create if not exists
  $doc = new DOMDocument("1.0","utf-8.0");
  $root = $doc->createElement('customers');
  $root = $doc->documentElement;
}

//format the output of the created nodes
$doc->preserveWhiteSpace = false;
$doc->formatOutput = true;

$all_emails = $doc->getElementsByTagName("email");
  
  foreach($all_emails as $e)
  {
    //validate email
    if($e->nodeValue == $email)
    {
      $error="email";
    }
 
  }
  //only run if email validates
  if ($error!="email") {

  //create nodes

$xml_customer = $doc->createElement("customer");
$root->appendChild($xml_customer);

$xml_login = $doc->createElement("email");
$xml_customer->appendChild($xml_login);
$xml_username = $doc->createTextNode($email);
$xml_login->appendChild($xml_username);

$xml_password = $doc->createElement("password");
$xml_customer->appendChild($xml_password);
$xml_pass_text = $doc->createTextNode($password);
$xml_password->appendChild($xml_pass_text);

$xml_name = $doc->createElement("first");
$xml_customer->appendChild($xml_name);
$xml_first_name=$doc->createTextNode($name);
$xml_name->appendChild($xml_first_name);

$xml_last = $doc->createElement("last");
$xml_customer->appendChild($xml_last);
$xml_last_name=$doc->createTextNode($last_name);
$xml_last->appendChild($xml_last_name);

//create id from max value of xml document
$id=$doc->getElementsByTagName('customer')->length;
if ($id==1) {
  $id=$id;
}
else{
  $id++;
}

$xml_id = $doc->createElement("id");
$xml_customer->appendChild($xml_id);
$xml_id_no = $doc->createTextNode($id);
$xml_id->appendChild($xml_id_no);

//try to save the xml file
if($doc->save($url)!=false);
{
  //registration complete
  

  //email new user
mail($email,'You registered for ShopOnline','Dear '.$name.' , welcome to ShopOnline.
Your customer id is '.$id.' and your password is '.$password,'From registration@shoponline.com.au');
//add session variables 

$_SESSION['name'] = $name;
$_SESSION['username'] = $email;
$registered = true;
}
}




if ($registered ==true && $error=="") {
  echo $registered;
}
else
{
  echo $error;
}




?>