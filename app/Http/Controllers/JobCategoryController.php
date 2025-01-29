<?php

namespace App\Http\Controllers;

use App\Models\JobCategory;
use Illuminate\Http\Request;

class JobCategoryController extends Controller
{
    public function index()
    {
        $data = JobCategory::all();
        if ($data->isEmpty()) {
            return response()->json([
                'message' => 'category is empty'
            ]);
        }
        return response()->json($data);
    }
}
