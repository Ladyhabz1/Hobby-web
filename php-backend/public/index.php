<?php

declare(strict_types=1);

header('Content-Type: application/json');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = array_filter(array_map('trim', explode(',', (string) getenv('ALLOWED_ORIGINS'))));

if ($origin !== '' && in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';

function jsonResponse(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_SLASHES);
    exit;
}

if ($method === 'GET' && $path === '/api/health') {
    jsonResponse(200, ['status' => 'ok']);
}

if ($method === 'GET' && $path === '/api/blog') {
    jsonResponse(200, [
        'posts' => [
            [
                'id' => '1',
                'title' => 'Breathing Rhythm Update',
                'summary' => 'Worked on bilateral breathing and smoother turns this week.',
            ],
            [
                'id' => '2',
                'title' => 'Open Water Notes',
                'summary' => 'Focused on calm pacing and sighting drills in low morning light.',
            ],
        ],
    ]);
}

if ($method === 'POST' && $path === '/api/blog') {
    $input = json_decode(file_get_contents('php://input') ?: '{}', true);
    $title = trim((string) ($input['title'] ?? ''));
    $summary = trim((string) ($input['summary'] ?? ''));

    if ($title === '' || $summary === '') {
        jsonResponse(422, ['message' => 'Title and summary are required.']);
    }

    jsonResponse(201, [
        'id' => bin2hex(random_bytes(8)),
        'message' => 'created',
    ]);
}

if ($method === 'GET' && $path === '/api/gallery') {
    jsonResponse(200, [
        'images' => [
            [
                'id' => '1',
                'title' => 'Morning Lanes',
                'url' => 'https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?auto=format&fit=crop&w=1200&q=80',
            ],
            [
                'id' => '2',
                'title' => 'Pool Surface',
                'url' => 'https://images.unsplash.com/photo-1560090995-01632a28895b?auto=format&fit=crop&w=1200&q=80',
            ],
            [
                'id' => '3',
                'title' => 'Open Water',
                'url' => 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80',
            ],
        ],
    ]);
}

if ($method === 'POST' && $path === '/api/contact') {
    $input = json_decode(file_get_contents('php://input') ?: '{}', true);
    $name = trim((string) ($input['name'] ?? ''));
    $email = trim((string) ($input['email'] ?? ''));
    $message = trim((string) ($input['message'] ?? ''));

    if ($name === '' || $email === '' || $message === '') {
        jsonResponse(422, ['message' => 'Name, email, and message are required.']);
    }

    jsonResponse(201, [
        'message' => 'received',
        'ticket' => 'CT-' . date('Y') . '-' . strtoupper(substr(bin2hex(random_bytes(4)), 0, 6)),
    ]);
}

jsonResponse(404, ['message' => 'Not Found']);
