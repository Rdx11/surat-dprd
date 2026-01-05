<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Gallery;
use App\Models\OfficeInfo;
use App\Models\Banner;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $banners = Banner::active()->ordered()->get();
        $services = Service::active()->orderBy('order')->get();
        $galleries = Gallery::active()->latest()->take(6)->get();
        $officeInfo = OfficeInfo::first();

        return Inertia::render('Home', [
            'banners' => $banners,
            'services' => $services,
            'galleries' => $galleries,
            'officeInfo' => $officeInfo,
        ]);
    }
}
