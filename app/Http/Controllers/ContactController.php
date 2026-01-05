<?php

namespace App\Http\Controllers;

use App\Models\OfficeInfo;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $officeInfo = OfficeInfo::first();

        return Inertia::render('Contact/Index', [
            'officeInfo' => $officeInfo,
        ]);
    }
}
