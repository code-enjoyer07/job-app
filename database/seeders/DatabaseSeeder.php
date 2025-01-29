<?php

namespace Database\Seeders;

use App\Models\JobCategory;
use App\Models\JobVacancy;
use App\Models\Position;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'username' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin'),
            'role' => 'admin',
        ]);

        JobCategory::create(['job_category' => 'Software Developer']);
        JobCategory::create(['job_category' => 'Data Analyst']);
        JobCategory::create(['job_category' => 'Product Manager']);
        JobCategory::create(['job_category' => 'HR Specialist']);
        JobCategory::create(['job_category' => 'Marketing Executive']);
        JobCategory::create(['job_category' => 'Business Analyst']);
        JobCategory::create(['job_category' => 'Graphic Designer']);
        JobCategory::create(['job_category' => 'UX/UI Designer']);
        JobCategory::create(['job_category' => 'Web Developer']);
        JobCategory::create(['job_category' => 'Project Manager']);
        JobCategory::create(['job_category' => 'DevOps Engineer']);
        JobCategory::create(['job_category' => 'Machine Learning Engineer']);
        JobCategory::create(['job_category' => 'Data Scientist']);
        JobCategory::create(['job_category' => 'Mobile App Developer']);
        JobCategory::create(['job_category' => 'Sales Manager']);
        JobCategory::create(['job_category' => 'Customer Support Specialist']);
        JobCategory::create(['job_category' => 'Operations Manager']);
        JobCategory::create(['job_category' => 'Content Writer']);
        JobCategory::create(['job_category' => 'Digital Marketing Specialist']);
        JobCategory::create(['job_category' => 'Accountant']);
        JobCategory::create(['job_category' => 'Legal Advisor']);
        JobCategory::create(['job_category' => 'Financial Analyst']);
        JobCategory::create(['job_category' => 'Cloud Architect']);
        JobCategory::create(['job_category' => 'Network Engineer']);
        JobCategory::create(['job_category' => 'Cybersecurity Specialist']);

        Position::create(['position_name' => 'Software Developer']);
        Position::create(['position_name' => 'Data Analyst']);
        Position::create(['position_name' => 'Product Manager']);
        Position::create(['position_name' => 'HR Specialist']);
        Position::create(['position_name' => 'Marketing Executive']);
        Position::create(['position_name' => 'Business Analyst']);
        Position::create(['position_name' => 'Graphic Designer']);
        Position::create(['position_name' => 'UX/UI Designer']);
        Position::create(['position_name' => 'Web Developer']);
        Position::create(['position_name' => 'Project Manager']);
        Position::create(['position_name' => 'DevOps Engineer']);
        Position::create(['position_name' => 'Machine Learning Engineer']);
        Position::create(['position_name' => 'Data Scientist']);
        Position::create(['position_name' => 'Mobile App Developer']);
        Position::create(['position_name' => 'Sales Manager']);
        Position::create(['position_name' => 'Customer Support Specialist']);
        Position::create(['position_name' => 'Operations Manager']);
        Position::create(['position_name' => 'Content Writer']);
        Position::create(['position_name' => 'Digital Marketing Specialist']);
        Position::create(['position_name' => 'Accountant']);
        Position::create(['position_name' => 'Legal Advisor']);
        Position::create(['position_name' => 'Financial Analyst']);
        Position::create(['position_name' => 'Cloud Architect']);
        Position::create(['position_name' => 'Network Engineer']);
        Position::create(['position_name' => 'Cybersecurity Specialist']);

        JobVacancy::create([
            'job_category_id' => 1,
            'company' => 'Tech Solutions',
            'address' => 'Jl. Teknologi No. 123, Jakarta',
            'description' => 'We are looking for a skilled Software Developer to join our team.',
            'position_id' => 1
        ]);
    }
}
