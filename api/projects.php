<?php
require_once __DIR__ . "/vendor/autoload.php";

$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();

$client = new MongoDB\Client(getenv("MONGO_URI"));

$projects = $client->portfolio->projects;

echo json_encode($projects->find()->toArray());

?>
