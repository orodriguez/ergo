import React, { useEffect } from "react";
import { useState } from "react";
import createApiClient from "src/apiClient";

const Status: React.FC = (() => {
    const [status, setStatus] = useState<string>("Loading...");
    const api = createApiClient();

    useEffect(() => {
        api.getStatus()
            .then(response => setStatus(response.data.status))
            .catch(() => setStatus("Unable to get status"));
    }, []);

    return <h1>{status}</h1>;
});

export default Status;