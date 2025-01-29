<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplyPosition extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'user_id',
        'job_vacancy_id',
        'job_apply_users_id',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function jobVacancy()
    {
        return $this->belongsTo(JobVacancy::class);
    }

    public function availablePosition()
    {
        return $this->belongsTo(AvailablePosition::class, 'position_id');
    }
}
