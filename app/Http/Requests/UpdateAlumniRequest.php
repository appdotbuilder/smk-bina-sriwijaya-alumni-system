<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAlumniRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $alumni = $this->route('alumni');
        
        return [
            'nama' => 'required|string|max:255',
            'angkatan' => 'required|string|max:4',
            'jurusan' => 'required|string|max:255',
            'email' => 'required|email|unique:alumni,email,' . $alumni->id_alumni . ',id_alumni',
            'no_hp' => 'nullable|string|max:20',
            'pekerjaan' => 'nullable|string|max:255',
            'alamat' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nama.required' => 'Nama lengkap wajib diisi.',
            'angkatan.required' => 'Angkatan/tahun lulus wajib diisi.',
            'jurusan.required' => 'Jurusan wajib diisi.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email sudah digunakan oleh alumni lain.',
        ];
    }
}