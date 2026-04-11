<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\BlogPost;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminBlogController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $payload = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'summary' => ['required', 'string', 'max:3000'],
            'body' => ['nullable', 'string'],
            'status' => ['nullable', 'in:draft,published,archived'],
        ]);

        $post = BlogPost::query()->create([
            'title' => $payload['title'],
            'slug' => Str::slug($payload['title']) . '-' . Str::lower(Str::random(6)),
            'summary' => $payload['summary'],
            'body' => $payload['body'] ?? null,
            'status' => $payload['status'] ?? 'draft',
            'author_id' => $request->user()->id,
            'published_at' => ($payload['status'] ?? 'draft') === 'published' ? now() : null,
        ]);

        AuditLog::query()->create([
            'actor_user_id' => $request->user()->id,
            'action' => 'blog.create',
            'entity_type' => 'blog_post',
            'entity_id' => $post->id,
            'metadata_json' => ['status' => $post->status],
        ]);

        return response()->json(['id' => (string) $post->id, 'message' => 'created'], 201);
    }

    public function update(Request $request, BlogPost $post): JsonResponse
    {
        $payload = $request->validate([
            'title' => ['sometimes', 'string', 'max:200'],
            'summary' => ['sometimes', 'string', 'max:3000'],
            'body' => ['nullable', 'string'],
            'status' => ['sometimes', 'in:draft,published,archived'],
        ]);

        if (isset($payload['title'])) {
            $post->slug = Str::slug($payload['title']) . '-' . Str::lower(Str::random(6));
        }

        $post->fill($payload);
        if (($payload['status'] ?? null) === 'published' && $post->published_at === null) {
            $post->published_at = now();
        }
        $post->save();

        return response()->json(['message' => 'updated']);
    }

    public function destroy(Request $request, BlogPost $post): JsonResponse
    {
        $post->delete();

        AuditLog::query()->create([
            'actor_user_id' => $request->user()->id,
            'action' => 'blog.delete',
            'entity_type' => 'blog_post',
            'entity_id' => $post->id,
            'metadata_json' => null,
        ]);

        return response()->json(['message' => 'deleted']);
    }
}
