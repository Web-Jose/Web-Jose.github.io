<?php
// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Get form field values
  $name = $_POST["name"];
  $email = $_POST["email"];
  $subject = $_POST["subject"];
  $message = $_POST["message"];

  // Create email message
  $email_message = "Name: $name\n";
  $email_message .= "Email: $email\n";
  $email_message .= "Subject: $subject\n";
  $email_message .= "Message:\n$message\n";

  // Set email recipient and subject
  $to = "josehcortes@gmail.com";
  $email_subject = "New Contact Form Submission: $subject";

  // Set email headers
  $headers = "From: $name <$email>\r\n";
  $headers .= "Reply-To: $email\r\n";

  // Send email
  if (mail($to, $email_subject, $email_message, $headers)) {
    // Success message
    echo "Thank you for your message! We'll get back to you shortly.";
  } else {
    // Error message
    echo "Sorry, there was an error sending your message. Please try again later.";
  }
}
?>
