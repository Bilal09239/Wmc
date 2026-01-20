<?php
// Hier wird geprüft ob es per POST gesendet wurde
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    echo "Formular wurde nicht per POST gesendet."; // falls nicht
    exit;
}
// '' beduetet entweder nichts drinen oder gar nicht dar
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

# hier sorgt <pre> dafür das Zeilenumbrüche korrekt angezeigt werden 
echo "<pre>";

// informationen werden ausgegben 
echo "Name: $name\n";
echo "Email: $email\n";
echo "Message:\n\n$message\n";
echo "</pre>";

?>
