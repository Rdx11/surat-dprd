<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OfficeInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OfficeInfoController extends Controller
{
    public function edit()
    {
        $officeInfo = OfficeInfo::first();

        return Inertia::render('Admin/OfficeInfo/Edit', [
            'officeInfo' => $officeInfo,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'office_name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'required|string|max:50',
            'email' => 'required|email|max:100',
            'working_hours' => 'required|string',
            'maps_embed' => 'nullable|string',
        ]);

        $officeInfo = OfficeInfo::first();

        if ($officeInfo) {
            $officeInfo->update($validated);
        } else {
            OfficeInfo::create($validated);
        }

        return redirect()->back()
            ->with('success', 'Informasi kantor berhasil diperbarui.');
    }
}
