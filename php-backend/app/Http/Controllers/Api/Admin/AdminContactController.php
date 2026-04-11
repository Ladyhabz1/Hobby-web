<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminContactController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $messages = ContactMessage::query()
            ->when($request->filled('status'), fn ($q) => $q->where('status', $request->string('status')->toString()))
            ->latest()
            ->paginate((int) $request->integer('per_page', 20));

        return response()->json($messages);
    }

    public function updateStatus(Request $request, ContactMessage $message): JsonResponse
    {
        $payload = $request->validate([
            'status' => ['required', 'in:new,read,replied,spam'],
        ]);

        $message->status = $payload['status'];
        $message->save();

        return response()->json(['message' => 'updated']);
    }
}
