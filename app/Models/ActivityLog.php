<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    use HasFactory;
    protected $table = 'activity_logs';
    protected $fillable = [
        'activity_log_id',
        'employee_id',
        'employee_name',
        'title',
        'description',
        'unreadNotification',
        'user_id'
    ];
    protected $cast  = [
        'created_at' => 'datetime',
    ];
    public function toJson($options = 0)
    {
        return json_encode($this->jsonSerialize(), $options);
    }

}
