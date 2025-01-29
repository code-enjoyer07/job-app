<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobVacancy extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_category_id',
        'company',
        'address',
        'description',
        'position_id',
    ];

    /**
     * Get the job category associated with the job vacancy.
     */
    public function jobCategory()
    {
        return $this->belongsTo(JobCategory::class, 'job_category_id');
    }

    /**
     * Get the position associated with the job vacancy.
     */
    public function position()
    {
        return $this->belongsTo(Position::class, 'position_id');
    }
}

