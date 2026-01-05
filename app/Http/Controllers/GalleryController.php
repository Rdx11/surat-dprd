<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index()
    {
        $galleries = Gallery::active()
            ->latest()
            ->paginate(12);

        return Inertia::render('Gallery/Index', [
            'galleries' => $galleries,
        ]);
    }
}
