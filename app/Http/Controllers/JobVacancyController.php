<?php

namespace App\Http\Controllers;

use App\Models\JobVacancy;
use App\Models\Position;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class JobVacancyController extends Controller
{
    public function index()
    {
        $jobVacancies = JobVacancy::with('jobCategory', 'position')->get();
        return response()->json($jobVacancies);
    }

    public function store(Request $request)
    {
        $request->validate([
            'job_category_id' => 'required|exists:job_categories,id',
            'company' => 'required|string|max:255',
            'address' => 'nullable|string',
            'description' => 'nullable|string',
            'position_name' => 'required|string',
        ]);

        $position = Position::firstOrCreate(
            ['position_name' => $request->position_name],
            ['position_name' => $request->position_name]
        );

        $request->merge(['position_id' => $position->id]);

        $jobVacancy = JobVacancy::create($request->all());
        return response()->json($jobVacancy, 201);
    }

    public function show($id)
    {
        $jobVacancy = JobVacancy::with('jobCategory', 'position')->find($id);

        if (!$jobVacancy) {
            return response()->json(['message' => 'Job Vacancy not found'], 404);
        }

        return response()->json($jobVacancy);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'job_category_id' => 'required|exists:job_categories,id',
            'company' => 'required|string|max:255',
            'address' => 'nullable|string',
            'description' => 'nullable|string',
            'position_name' => 'required|string',
        ]);

        $position = Position::firstOrCreate(
            ['position_name' => $request->position_name],
            ['position_name' => $request->position_name]
        );

        $request->merge(['position_id' => $position->id]);

        $jobVacancy = JobVacancy::find($id);

        if (!$jobVacancy) {
            return response()->json(['message' => 'Job Vacancy not found'], 404);
        }

        $jobVacancy->update($request->all());

        return response()->json($jobVacancy);
    }

    public function destroy($id)
    {
        $jobVacancy = JobVacancy::find($id);

        if (!$jobVacancy) {
            return response()->json(['message' => 'Job Vacancy not found'], 404);
        }

        $jobVacancy->delete();
        return response()->json(['message' => 'Job Vacancy deleted successfully']);
    }
}

