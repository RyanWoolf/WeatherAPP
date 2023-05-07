<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use GuzzleHttp\Client;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/weather', function () {
    $apiKey = config('services.weatherapi.key');
    $city = request('city');

    
    $client = new Client(["base_uri" => "https://api.weatherapi.com/v1/current.json?key=f8093aa2fbae4a8c8a870838230602&q=Brisbane&aqi=no"]);

    $response = $client->get("https://api.weatherapi.com/v1/forecast.json?key=$apiKey&q=$city&days=5&aqi=no&alerts=no");
    return $response->getBody();
});
