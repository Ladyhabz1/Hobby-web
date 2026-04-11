<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBlogSubmissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:200'],
            'summary' => ['required', 'string', 'min:10', 'max:3000'],
            // Honeypot field should remain empty in normal human submissions.
            'website' => ['nullable', 'max:0'],
        ];
    }
}
