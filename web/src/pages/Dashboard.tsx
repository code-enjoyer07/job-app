import axios from "axios";
import Navbar from "../components/Navbar";
import { ENV } from "../env";
import { useEffect, useState } from "react";
import { JobVacancy, Category } from "../types";

export default function Dashboard() {
    const [jobVacancy, setJobVacancy] = useState<JobVacancy[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
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

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/job-vacancy`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${ENV.TOKEN}`,
                    },
                }
            );
            setJobVacancy([...jobVacancy, response.data]);
            setModalOpen(false);
        } catch (error) {
            console.error("Error creating job vacancy", error);
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
                                    onClick={() => setModalOpen(true)}
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
                                    <div className="card-header border-0">
                                        <h5 className="mb-0">{data.company}</h5>
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
            </div >

            {modalOpen && (
                <div className="modal" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Job Vacancy</h5>
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
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="position_name">Position</label>
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
                                        Save Job Vacancy
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    );
}

