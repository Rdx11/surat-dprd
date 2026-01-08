<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\GalleryController as AdminGalleryController;
use App\Http\Controllers\Admin\OfficeInfoController;
use App\Http\Controllers\Admin\ArchiveController;
use App\Http\Controllers\Admin\BannerController;
use App\Http\Controllers\Admin\ReportController as AdminReportController;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/layanan', [ServiceController::class, 'index'])->name('services.index');
Route::get('/layanan/{slug}', [ServiceController::class, 'show'])->name('services.show');
Route::get('/galeri', [GalleryController::class, 'index'])->name('gallery.index');
Route::get('/kontak', [ContactController::class, 'index'])->name('contact.index');

// User Routes (Logged in users)
Route::middleware(['auth'])->prefix('user')->name('user.')->group(function () {
    Route::get('/dashboard', function () {
        return inertia('User/Dashboard');
    })->name('dashboard');
    
    // Reports
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('/reports/create', [ReportController::class, 'create'])->name('reports.create');
    Route::post('/reports', [ReportController::class, 'store'])->name('reports.store');
    Route::get('/reports/{report}', [ReportController::class, 'show'])->name('reports.show');
});

// Admin Routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Services CRUD
    Route::resource('services', AdminServiceController::class)->except(['show']);
    
    // Gallery CRUD
    Route::resource('gallery', AdminGalleryController::class)->except(['show']);
    
    // Office Info
    Route::get('/office-info', [OfficeInfoController::class, 'edit'])->name('office-info.edit');
    Route::put('/office-info', [OfficeInfoController::class, 'update'])->name('office-info.update');

    // Archives CRUD
    Route::resource('archives', ArchiveController::class)->except(['show']);
    Route::get('/archives/{archive}/download', [ArchiveController::class, 'download'])->name('archives.download');

    // Banners CRUD
    Route::resource('banners', BannerController::class)->except(['show']);

    // Reports Management
    Route::get('/reports', [AdminReportController::class, 'index'])->name('reports.index');
    Route::get('/reports/{report}', [AdminReportController::class, 'show'])->name('reports.show');
    Route::put('/reports/{report}', [AdminReportController::class, 'update'])->name('reports.update');
    Route::delete('/reports/{report}', [AdminReportController::class, 'destroy'])->name('reports.destroy');
});

// Profile Routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
