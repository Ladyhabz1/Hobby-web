<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email:rfc,dns', 'max:190'],
            'message' => ['required', 'string', 'min:5', 'max:5000'],
            'source_page' => ['nullable', 'string', 'max:120'],
            // Honeypot field should remain empty in normal human submissions.
            'website' => ['nullable', 'max:0'],
        ];
    }
}
