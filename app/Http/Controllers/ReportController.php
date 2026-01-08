<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        $reports = Report::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('User/Reports/Index', [
            'reports' => $reports,
            'bidangOptions' => Report::getBidangOptions(),
        ]);
    }

    public function create()
    {
        return Inertia::render('User/Reports/Create', [
            'bidangOptions' => Report::getBidangOptions(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'nim' => 'required|string|max:50',
            'laporan' => 'required|string',
            'bukti' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:5120',
            'bidang' => 'required|array|min:1',
            'bidang.*' => 'in:keuangan,perdagangan,koperasi,energi,pariwisata',
        ]);

        $buktiPath = null;
        if ($request->hasFile('bukti')) {
            $buktiPath = $request->file('bukti')->store('reports', 'public');
        }

        Report::create([
            'user_id' => auth()->id(),
            'nama' => $validated['nama'],
            'nim' => $validated['nim'],
            'laporan' => $validated['laporan'],
            'bukti_path' => $buktiPath,
            'bidang' => $validated['bidang'],
            'status' => 'pending',
        ]);

        return redirect()->route('user.reports.index')
            ->with('success', 'Laporan berhasil dikirim.');
    }

    public function show(Report $report)
    {
        if ($report->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('User/Reports/Show', [
            'report' => $report,
            'bidangOptions' => Report::getBidangOptions(),
        ]);
    }
}
