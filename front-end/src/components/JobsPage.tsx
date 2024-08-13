import axios from "axios";
import React, { useEffect, useState } from "react";

type Job = {
    id: number;
    name: string;
};

const Container: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);

    const client = axios.create({
        baseURL: 'http://localhost:2345'
    });

    useEffect(() => {
        client.get('/api/jobs').then(response => setJobs(response.data));
    }, []);

    return <JobsPage />
};

const JobsPage: React.FC = () => {
    return <>
        <h1>Jobs</h1>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>text1.1</td>
                    <td>text1.2</td>
                </tr>
            </tbody>
        </table>
    </>;
};

export default Container;