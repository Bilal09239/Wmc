<?php
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    echo "Formular wurde nicht per POST gesendet.";
    exit;
}

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

echo "<pre>";
echo "Name: $name\n";
echo "Email: $email\n";
echo "Message:\n\n$message\n";
echo "</pre>";

?>
