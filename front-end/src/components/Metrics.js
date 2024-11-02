import React, { useEffect, useState } from "react";
import { getProject } from "../api";

const Metrics = ({ projectId }) => {
    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await getProject(projectId);
                setProject(response.data);
                console.log(response)
            } catch (error) {
                console.error("Error fetching project:", error);
            }
        };
        fetchProject();
    }, [projectId]);

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Project: {project.name}</h2>
            <p>Type: {project.type}</p>
            <p>Owner: {project.owner}</p>
            
            <h3>Metrics</h3>
            <ul>
                <li><strong>Revenue Generated:</strong> ${project.metrics[0].value}</li>
                <li><strong>No. of Items Processed:</strong> {project.metrics[1].value}</li>
                <li><strong>Hours Saved:</strong> {project.metrics[2].value}</li>
            </ul>

        </div>
    );
};

export default Metrics;
