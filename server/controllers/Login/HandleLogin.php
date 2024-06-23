<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

$servername = "localhost";
$username = "root";
$password = "";
$database = "kampung_rasa_db";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => "Database connection failed: " . $e->getMessage()]);
    exit();
}

// Get the POST data
$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['username']) || empty($data['password'])) {
    echo json_encode(['success' => false, 'error' => 'Username and password are required']);
    exit();
}

$username = $data['username'];
$password = $data['password'];

// Query the database to get the user's information
$query = "SELECT * FROM staf WHERE username = :username";
$stmt = $conn->prepare($query);
$stmt->execute(['username' => $username]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

// Check if the user exists and the password matches
if ($row && $password === $row['password']) {
    // Start a new session and store the user's information
    session_start();
    $_SESSION['username'] = $row['username'];

    // Return a success message and the session information
    echo json_encode(['success' => true, 'session' => $_SESSION, 'username' => $row['username']]);
} else {
    // Return an error message
    echo json_encode(['success' => false, 'error' => 'Invalid username or password']);
}
?>