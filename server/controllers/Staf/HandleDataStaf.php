<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Connect to the database
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'kampung_rasa_db';

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// Get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));
$input = json_decode(file_get_contents('php://input'), true);

// Determine the action based on the HTTP method
switch ($method) {
    case 'GET':
        // Get the staff data from the database
        $sql = "SELECT * FROM staf";
        $result = $conn->query($sql);

        // Check if there are any staff records
        if ($result->num_rows > 0) {
            // Fetch the staff records and convert them to an array of objects
            $staff = [];
            while ($row = $result->fetch_assoc()) {
                $staff[] = $row;
            }

            // Return the staff data as a JSON response
            echo json_encode($staff);
        } else {
            // Return an empty JSON response if there are no staff records
            echo json_encode([]);
        }
        break;
    case 'DELETE':
        // Check if an ID was provided in the request
        if (isset($input['id_staf'])) {
            $id = intval($input['id_staf']);

            // Delete the staff record from the database
            $sql = "DELETE FROM staf WHERE id_staf = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $id);
            if ($stmt->execute()) {
                echo json_encode(array("success" => true, "message" => "Staff with ID $id deleted successfully"));
            } else {
                echo json_encode(array("success" => false, "error" => "Failed to delete staff with ID $id"));
            }
        } else {
            // Return an error message if no ID was provided
            echo json_encode(array("success" => false, "error" => "No staff ID provided"));
        }
        break;
    default:
        // Return an error message for unsupported HTTP methods
        http_response_code(405);
        echo json_encode(array("success" => false, "error" => "Method not allowed"));
}

// Close the database connection
$conn->close();
?>