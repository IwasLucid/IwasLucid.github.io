<?php
// Retrieve the form data
$name = $_POST['Name'];
$email = $_POST['Email'];
$subject = $_POST['Subject'];
$message = $_POST['Message'];

// Set the recipient email address
$to = 'gogo01.nikolov@gmail.com';

// Set the email subject
$email_subject = "New message from $name: $subject";

// Set the email body
$email_body = "You have received a new message from $name.\n\n".
              "Email address: $email\n\n".
              "Message:\n$message";

// Send the email
$headers = "From: $email\n";
$headers .= "Reply-To: $email\n";
mail($to, $email_subject, $email_body, $headers);

// Save the form data to a database
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database";

// Create a new database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the database connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Prepare a SQL statement to insert the form data
$sql = "INSERT INTO messages (name, email, subject, message) VALUES ('$name', '$email', '$subject', '$message')";

// Execute the SQL statement
if ($conn->query($sql) === TRUE) {
  echo "Message sent and saved successfully.";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the database connection
$conn->close();
?>