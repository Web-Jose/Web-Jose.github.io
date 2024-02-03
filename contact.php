<?php
if (isset($_POST["submit"])) {
  // Only process POST requests
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form field values and sanitize them
    $name = isset($_POST["name"]) ? htmlspecialchars(strip_tags(trim($_POST["name"]))) : "";
    $email = isset($_POST["email"]) ? filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL) : "";
    $subject = isset($_POST["subject"]) ? htmlspecialchars(strip_tags(trim($_POST["subject"]))) : "";
    $message = isset($_POST["message"]) ? htmlspecialchars(strip_tags(trim($_POST["message"]))) : "";

    // Validate inputs
    if ($name === "" || $email === "" || $subject === "" || $message === "") {
      echo "Please fill in all required fields.";
      exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      echo "Invalid email format.";
      exit;
    }

    // Create email message
    $email_message = "Name: $name\n";
    $email_message .= "Email: $email\n";
    $email_message .= "Subject: $subject\n";
    $email_message .= "Message:\n$message\n";

    // Set email recipient and subject
    $to = "josehcortes02@gmail.com";
    $email_subject = "New Contact Form Submission: $subject";

    // Set email headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send email
    if (mail($to, $email_subject, $email_message, $headers)) {
      // Success message
      echo "Thank you for your message! We'll get back to you shortly.";
    } else {
      // Error message
      echo "Sorry, there was an error sending your message. Please try again later.";
    }
  } else {
    // Not a POST request
    echo "Access Denied. You must use POST method to send data.";
  }
}