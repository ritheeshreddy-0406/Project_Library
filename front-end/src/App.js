import React, { useState } from "react";
import ProjectForm from "./components/ProjectForm";
import Metrics from "./components/Metrics";

function App() {
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const handleProjectAdded = (project) => {
        setProjects([...projects, project]);
    };

    return (
        <div>
            <h1>Project Library Management</h1>
            <ProjectForm onProjectAdded={handleProjectAdded} />
            <h2>Projects</h2>
            <ul>
                {projects.map((project) => (
                    <li key={project.id} onClick={() => setSelectedProjectId(project.id)}>
                        {project.name}
                    </li>
                ))}
            </ul>
            {selectedProjectId && <Metrics projectId={selectedProjectId} />}
        </div>
    );
}

export default App;
