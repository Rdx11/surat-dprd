<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $query = Report::with('user')->orderBy('created_at', 'desc');

        if ($request->status) {
            $query->where('status', $request->status);
        }

        $reports = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/Reports/Index', [
            'reports' => $reports,
            'bidangOptions' => Report::getBidangOptions(),
            'filters' => $request->only('status'),
        ]);
    }

    public function show(Report $report)
    {
        $report->load('user');

        return Inertia::render('Admin/Reports/Show', [
            'report' => $report,
            'bidangOptions' => Report::getBidangOptions(),
        ]);
    }

    public function update(Request $request, Report $report)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,diproses,selesai',
            'catatan_admin' => 'nullable|string',
        ]);

        $report->update($validated);

        return redirect()->route('admin.reports.index')
            ->with('success', 'Status laporan berhasil diperbarui.');
    }

    public function destroy(Report $report)
    {
        if ($report->bukti_path) {
            \Storage::disk('public')->delete($report->bukti_path);
        }

        $report->delete();

        return redirect()->route('admin.reports.index')
            ->with('success', 'Laporan berhasil dihapus.');
    }
}
