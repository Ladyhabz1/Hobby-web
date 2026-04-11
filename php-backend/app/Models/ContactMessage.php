<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'message',
        'source_page',
        'status',
        'ticket_code',
        'submitted_by_ip',
        'user_agent',
    ];
}
