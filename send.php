<?php
// Prüfen ob POST abgesendet wurde
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    echo "Formular wurde nicht per POST gesendet.";
    exit;
}

// Daten holen
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

// EMAIL IN DER KONSOLE AUSGEBEN STATT SENDEN
echo "<pre>";
echo "Name: $name\n";
echo "Email: $email\n";
echo "Message:\n\n$message\n";
echo "</pre>";

?>
