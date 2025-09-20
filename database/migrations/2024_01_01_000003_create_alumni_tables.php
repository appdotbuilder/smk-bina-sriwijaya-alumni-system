<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update users table to include role and status
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['alumni', 'admin'])->default('alumni')->after('email');
            $table->enum('status', ['active', 'pending', 'inactive'])->default('pending')->after('role');
        });

        // Create alumni table
        Schema::create('alumni', function (Blueprint $table) {
            $table->id('id_alumni');
            $table->foreignId('id_user')->constrained('users', 'id')->onDelete('cascade');
            $table->string('nama');
            $table->string('angkatan');
            $table->string('jurusan');
            $table->string('email')->unique();
            $table->string('no_hp')->nullable();
            $table->string('pekerjaan')->nullable();
            $table->text('alamat')->nullable();
            $table->timestamps();

            $table->index(['nama', 'angkatan', 'jurusan']);
        });

        // Create berita (news) table
        Schema::create('berita', function (Blueprint $table) {
            $table->id('id_berita');
            $table->string('judul');
            $table->text('isi');
            $table->date('tanggal');
            $table->string('penulis');
            $table->timestamps();

            $table->index('tanggal');
            $table->index('penulis');
        });

        // Create lowongan (job postings) table
        Schema::create('lowongan', function (Blueprint $table) {
            $table->id('id_lowongan');
            $table->string('judul');
            $table->text('deskripsi');
            $table->string('perusahaan');
            $table->date('tanggal_post');
            $table->timestamps();

            $table->index('tanggal_post');
            $table->index('perusahaan');
        });

        // Create kegiatan (activities) table
        Schema::create('kegiatan', function (Blueprint $table) {
            $table->id('id_kegiatan');
            $table->string('nama_kegiatan');
            $table->text('deskripsi');
            $table->date('tanggal');
            $table->timestamps();

            $table->index('tanggal');
        });

        // Create alumni_kegiatan pivot table
        Schema::create('alumni_kegiatan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_alumni')->constrained('alumni', 'id_alumni')->onDelete('cascade');
            $table->foreignId('id_kegiatan')->constrained('kegiatan', 'id_kegiatan')->onDelete('cascade');
            $table->timestamps();

            $table->unique(['id_alumni', 'id_kegiatan']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alumni_kegiatan');
        Schema::dropIfExists('kegiatan');
        Schema::dropIfExists('lowongan');
        Schema::dropIfExists('berita');
        Schema::dropIfExists('alumni');
        
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'status']);
        });
    }
};