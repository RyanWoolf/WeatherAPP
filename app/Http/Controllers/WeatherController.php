<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WeatherController extends Controller
    //public function getWeather($city)
{
    public function getWeather($city)
    {
        $api_key = "base64:sUlkhRyVGH2RYhiF5RPSfbNOQoodNLgpNCXA9WqTYqI=";
        $weather = file_get_contents("http://api.openweathermap.org/data/2.5/forecast?q=".$city."&appid=".$api_key);
        return json_decode($weather);
    }
}


