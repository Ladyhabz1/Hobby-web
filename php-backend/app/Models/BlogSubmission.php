<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'summary',
        'submitted_by_ip',
        'user_agent',
        'status',
        'approved_post_id',
    ];
}
