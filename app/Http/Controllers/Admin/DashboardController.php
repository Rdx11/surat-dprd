<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Gallery;
use App\Models\Archive;
use App\Models\Report;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalServices' => Service::count(),
                'activeServices' => Service::active()->count(),
                'totalGalleries' => Gallery::count(),
                'activeGalleries' => Gallery::active()->count(),
                'totalArchives' => Archive::count(),
                'activeArchives' => Archive::where('is_active', true)->count(),
                'totalReports' => Report::count(),
                'pendingReports' => Report::where('status', 'pending')->count(),
            ],
        ]);
    }
}
