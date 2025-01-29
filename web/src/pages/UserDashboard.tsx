import axios from "axios";
import Navbar from "../components/Navbar";
import { ENV } from "../env";
import { useEffect, useState } from "react";
import { JobVacancy, Category } from "../types";

export default function UserDashboard() {
    const [jobVacancy, setJobVacancy] = useState<JobVacancy[]>([]);

    const fetchJobList = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/job-vacancy`, {
            headers: {
                Authorization: `Bearer ${ENV.TOKEN}`,
            },
        });
        setJobVacancy(response.data);
    };

    useEffect(() => {
        fetchJobList();
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
        </>
    );
}

