<?php

namespace App\Http\Controllers\Api\PublicApi;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBlogSubmissionRequest;
use App\Models\BlogPost;
use App\Models\BlogSubmission;
use Illuminate\Http\JsonResponse;

class BlogController extends Controller
{
    public function index(): JsonResponse
    {
        $posts = BlogPost::query()
            ->where('status', 'published')
            ->latest('published_at')
            ->limit(20)
            ->get(['id', 'title', 'summary'])
            ->map(fn ($post) => [
                'id' => (string) $post->id,
                'title' => $post->title,
                'summary' => $post->summary,
            ]);

        return response()->json([
            'posts' => $posts,
        ]);
    }

    public function storeSubmission(StoreBlogSubmissionRequest $request): JsonResponse
    {
        $submission = BlogSubmission::query()->create([
            'title' => $request->string('title')->toString(),
            'summary' => $request->string('summary')->toString(),
            'submitted_by_ip' => $request->ip(),
            'user_agent' => (string) $request->userAgent(),
            'status' => 'pending',
        ]);

        // Frontend compatibility response shape.
        return response()->json([
            'id' => (string) $submission->id,
            'message' => 'created',
        ], 201);
    }
}
