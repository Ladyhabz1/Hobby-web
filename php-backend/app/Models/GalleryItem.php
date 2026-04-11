<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GalleryItem extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'title',
        'image_url',
        'alt_text',
        'sort_order',
        'is_published',
        'created_by',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];
}
