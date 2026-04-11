<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminGalleryController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $payload = $request->validate([
            'title' => ['required', 'string', 'max:160'],
            'image_url' => ['required', 'url', 'max:500'],
            'alt_text' => ['nullable', 'string', 'max:220'],
            'sort_order' => ['nullable', 'integer'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        $item = GalleryItem::query()->create([
            'title' => $payload['title'],
            'image_url' => $payload['image_url'],
            'alt_text' => $payload['alt_text'] ?? null,
            'sort_order' => $payload['sort_order'] ?? 0,
            'is_published' => $payload['is_published'] ?? true,
            'created_by' => $request->user()->id,
        ]);

        return response()->json(['id' => (string) $item->id, 'message' => 'created'], 201);
    }

    public function update(Request $request, GalleryItem $item): JsonResponse
    {
        $payload = $request->validate([
            'title' => ['sometimes', 'string', 'max:160'],
            'image_url' => ['sometimes', 'url', 'max:500'],
            'alt_text' => ['nullable', 'string', 'max:220'],
            'sort_order' => ['sometimes', 'integer'],
            'is_published' => ['sometimes', 'boolean'],
        ]);

        $item->fill($payload)->save();

        return response()->json(['message' => 'updated']);
    }

    public function destroy(GalleryItem $item): JsonResponse
    {
        $item->delete();

        return response()->json(['message' => 'deleted']);
    }
}
