export interface JobVacancy {
    id: string;
    company: string;
    address: string;
    description: string;
    created_at: string;
    updated_at: string;
    job_category: Category;
    position: Position;
}

export interface JobCategory {
    id: string;
    job_category: string;
}

export interface Category {
    id: string;
    job_category: string;
}

export interface Position {
    id: string;
    position_name: string;
}
