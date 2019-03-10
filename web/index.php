<?php

use Symfony\Component\Debug\Debug;

require_once __DIR__ . '/../vendor/autoload.php';

if (!array_key_exists('APP_ENV', $_SERVER)) {
    $_SERVER['APP_ENV'] = $_ENV['APP_ENV'] ?? null;
}

$_SERVER['APP_ENV'] = $_ENV['APP_ENV'] = $_SERVER['APP_ENV'] ?: $_ENV['APP_ENV'] ?: 'dev';
$_SERVER['APP_DEBUG'] = $_SERVER['APP_DEBUG'] ?? $_ENV['APP_DEBUG'] ?? 'prod' !== $_SERVER['APP_ENV'];
$_SERVER['APP_DEBUG'] = $_ENV['APP_DEBUG'] = (int)$_SERVER['APP_DEBUG'] || filter_var($_SERVER['APP_DEBUG'],
    FILTER_VALIDATE_BOOLEAN) ? '1' : '0';

if ($_SERVER['APP_DEBUG']) {
    umask(0000);
    Debug::enable();
}

$app = require __DIR__ . '/../src/app.php';
require __DIR__ . '/../config/' . $_SERVER['APP_ENV'] . '.php';
require __DIR__ . '/../src/controllers.php';
$app->run();
