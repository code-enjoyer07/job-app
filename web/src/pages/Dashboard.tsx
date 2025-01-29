import axios from "axios";
import Navbar from "../components/Navbar";
import { ENV } from "../env";
import { useEffect, useState } from "react";
import { JobVacancy, Category } from "../types";

export default function Dashboard() {
    const [jobVacancy, setJobVacancy] = useState<JobVacancy[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        job_category_id: "",
        company: "",
        address: "",
        description: "",
        position_name: "",
    });

    const fetchJobList = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/job-vacancy`, {
            headers: {
                Authorization: `Bearer ${ENV.TOKEN}`,
            },
        });
        setJobVacancy(response.data);
        console.log(response.data)
    };

    const fetchCategories = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/category`, {
            headers: {
                Authorization: `Bearer ${ENV.TOKEN}`,
            },
        });
        setCategories(response.data);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const url = isEditing
            ? `${import.meta.env.VITE_API_URL}/job-vacancy/${formData.job_category_id}`
            : `${import.meta.env.VITE_API_URL}/job-vacancy`;

        try {
            const response = await axios({
                method: isEditing ? "PUT" : "POST",
                url,
                data: formData,
                headers: {
                    Authorization: `Bearer ${ENV.TOKEN}`,
                },
            });

            if (isEditing) {
                setJobVacancy(jobVacancy.map((job) => (job.id === response.data.id ? response.data : job)));
            } else {
                setJobVacancy([...jobVacancy, response.data]);
            }

            setModalOpen(false);
            fetchJobList();
        } catch (error) {
            console.error("Error saving job vacancy", error);
        }
    };

    const handleEdit = (job: JobVacancy) => {
        setFormData({
            job_category_id: job.job_category.id || "",
            company: job.company || "",
            address: job.address || "",
            description: job.description || "",
            position_name: job.position.position_name || "",
        });
        setIsEditing(true);
        setModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/job-vacancy/${id}`, {
                headers: {
                    Authorization: `Bearer ${ENV.TOKEN}`,
                },
            });
            setJobVacancy(jobVacancy.filter((job) => job.id !== id));
        } catch (error) {
            console.error("Error deleting job vacancy", error);
        }
    };

    useEffect(() => {
        fetchJobList();
        fetchCategories();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="section-body mt-5">
                    <div className="section-header mb-3">
                        <div className="row">
                            <div className="col-md-8">
                                <h4 className="section-title text-muted">My Job Applications</h4>
                            </div>
                            <div className="col-md-4">
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setModalOpen(true);
                                    }}
                                    className="btn btn-primary btn-lg btn-block"
                                >
                                    + Add Job Applications
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="alert alert-warning">
                            List Company & Job
                        </div>
                    </div>

                    <div className="row mb-4">
                        {jobVacancy.map((data) => (
                            <div className="col-md-6 mt-3" key={data.id}>
                                <div className="card card-default">
                                    <div className="card-header border-0 d-flex justify-content-between">
                                        <h5 className="mb-0">{data.company}</h5>
                                        <div>
                                            <button
                                                onClick={() => handleEdit(data)}
                                                className="text-info mr-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(data.id)}
                                                className="text-danger"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body p-0">
                                        <table className="table table-striped mb-0">
                                            <tbody>
                                                <tr>
                                                    <th>Address</th>
                                                    <td className="text-muted">{data.address}</td>
                                                </tr>
                                                <tr>
                                                    <th>Category</th>
                                                    <td className="text-muted">
                                                        {data.job_category?.job_category || "N/A"}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Position</th>
                                                    <td className="text-muted">
                                                        {data.position?.position_name || "N/A"}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Description</th>
                                                    <td className="text-muted">{data.description}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {modalOpen && (
                <div className="modal" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{isEditing ? "Edit Job Vacancy" : "Add Job Vacancy"}</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setModalOpen(false)}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="job_category_id">Job Category</label>
                                        <select
                                            id="job_category_id"
                                            name="job_category_id"
                                            className="form-control"
                                            value={formData.job_category_id}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.job_category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="company">Company</label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            className="form-control"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            className="form-control"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            className="form-control"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="position_name">Position Name</label>
                                        <input
                                            type="text"
                                            id="position_name"
                                            name="position_name"
                                            className="form-control"
                                            value={formData.position_name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary">
                                        {isEditing ? "Update Job" : "Add Job"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

