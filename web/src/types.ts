export interface JobVacancy {
    id: number;
    company: string;
    address: string;
    description: string;
    created_at: string;
    updated_at: string;
    job_category: Category;
    position: Position;
}

export interface JobCategory {
    id: number;
    job_category: string;
}

export interface Category {
    id: number;
    job_category: string;
}

export interface Position {
    id: number;
    position_name: string;
}
