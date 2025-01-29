<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'position_name',
    ];

    /**
     * Get the job vacancies that belong to the position.
     */
    public function jobVacancies()
    {
        return $this->hasMany(JobVacancy::class, 'position_id');
    }
}

