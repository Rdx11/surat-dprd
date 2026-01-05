<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Archive;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ArchiveController extends Controller
{
    public function index()
    {
        $archives = Archive::orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Admin/Archives/Index', [
            'archives' => $archives,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Archives/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file' => 'required|file|mimes:pdf,doc,docx|max:10240', // max 10MB
            'report_date' => 'nullable|date',
            'is_active' => 'boolean',
        ]);

        $file = $request->file('file');
        $fileName = $file->getClientOriginalName();
        $fileType = $file->getClientOriginalExtension();
        $fileSize = $file->getSize();
        $filePath = $file->store('archives', 'public');

        Archive::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'file_path' => $filePath,
            'file_name' => $fileName,
            'file_type' => $fileType,
            'file_size' => $fileSize,
            'report_date' => $validated['report_date'],
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return redirect()->route('admin.archives.index')
            ->with('success', 'Arsip laporan berhasil ditambahkan.');
    }

    public function edit(Archive $archive)
    {
        return Inertia::render('Admin/Archives/Edit', [
            'archive' => $archive,
        ]);
    }

    public function update(Request $request, Archive $archive)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
            'report_date' => 'nullable|date',
            'is_active' => 'boolean',
        ]);

        $data = [
            'title' => $validated['title'],
            'description' => $validated['description'],
            'report_date' => $validated['report_date'],
            'is_active' => $validated['is_active'] ?? true,
        ];

        if ($request->hasFile('file')) {
            // Delete old file
            if ($archive->file_path) {
                Storage::disk('public')->delete($archive->file_path);
            }

            $file = $request->file('file');
            $data['file_name'] = $file->getClientOriginalName();
            $data['file_type'] = $file->getClientOriginalExtension();
            $data['file_size'] = $file->getSize();
            $data['file_path'] = $file->store('archives', 'public');
        }

        $archive->update($data);

        return redirect()->route('admin.archives.index')
            ->with('success', 'Arsip laporan berhasil diperbarui.');
    }

    public function destroy(Archive $archive)
    {
        if ($archive->file_path) {
            Storage::disk('public')->delete($archive->file_path);
        }

        $archive->delete();

        return redirect()->route('admin.archives.index')
            ->with('success', 'Arsip laporan berhasil dihapus.');
    }

    public function download(Archive $archive)
    {
        if (!Storage::disk('public')->exists($archive->file_path)) {
            return back()->with('error', 'File tidak ditemukan.');
        }

        return Storage::disk('public')->download($archive->file_path, $archive->file_name);
    }
}
