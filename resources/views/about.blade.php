<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Radar - официальный сайт</title>
</head>

<body>
    <div style="display: none;">
        @php
            $path = resource_path('images/svg/sprite.svg');
        @endphp
        @if(file_exists($path))
            {!! file_get_contents($path) !!}
        @else
        @endif
    </div>

    @vite(['resources/css/app.css', 'resources/js/app/about_app/about.js'])

    <div id="about_app"></div>
</body>

</html>
