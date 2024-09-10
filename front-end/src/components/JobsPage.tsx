import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Job } from "./types";

const Container: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);

    const client = axios.create({
        baseURL: 'http://localhost:5047/api'
    });

    useEffect(() => {
        client.get('/jobs').then(response => {
            console.log('response', response)
            setJobs(response.data as Job[]);
        });
    }, []);

    return <JobsPage jobs={jobs} />
};

interface IProps {
    jobs: Job[];
}

const JobsPage: React.FC<IProps> = ({ jobs }: IProps) => {
    return <>
        <h1>Jobs</h1>

        {jobs.length === 0 && <h2>Loading</h2>}
        {jobs.length > 0 && <JobsTable jobs={jobs} />}
    </>;
};

const JobsTable: React.FC<IProps> = ({ jobs }: IProps) => {
    return <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {jobs.map(job => <tr key={job.id}>
                <td>{job.title}</td>
                <td><Link to={`/jobs/${job.id}`} >View</Link></td>
            </tr>)}
        </tbody>
    </table>;
}

export default Container;