<?php

namespace App\Http\Controllers\Api\PublicApi;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class ContactController extends Controller
{
    public function store(StoreContactRequest $request): JsonResponse
    {
        $ticket = 'CT-' . now()->format('Y') . '-' . strtoupper(Str::random(6));

        ContactMessage::query()->create([
            'name' => $request->string('name')->toString(),
            'email' => $request->string('email')->toString(),
            'message' => $request->string('message')->toString(),
            'source_page' => $request->string('source_page')->toString() ?: '/contact',
            'status' => 'new',
            'ticket_code' => $ticket,
            'submitted_by_ip' => $request->ip(),
            'user_agent' => (string) $request->userAgent(),
        ]);

        // Frontend compatibility response shape.
        return response()->json([
            'message' => 'received',
            'ticket' => $ticket,
        ], 201);
    }
}
