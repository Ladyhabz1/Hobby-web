<?php

namespace App\Http\Controllers\Api\PublicApi;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Illuminate\Http\JsonResponse;

class GalleryController extends Controller
{
    public function index(): JsonResponse
    {
        $images = GalleryItem::query()
            ->where('is_published', true)
            ->orderBy('sort_order')
            ->limit(60)
            ->get(['id', 'title', 'image_url'])
            ->map(fn ($item) => [
                'id' => (string) $item->id,
                'title' => $item->title,
                'url' => $item->image_url,
            ]);

        return response()->json([
            'images' => $images,
        ]);
    }
}
