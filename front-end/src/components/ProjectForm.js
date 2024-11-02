import React, { useState } from "react";
import { createProject } from "../api";

const ProjectForm = ({ onProjectAdded }) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [owner, setOwner] = useState("");
    const [revenue, setRevenue] = useState("");
    const [itemsProcessed, setItemsProcessed] = useState("");
    const [hoursSaved, setHoursSaved] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const project = {
            name,
            type,
            owner,
            metrics: [
                { name: "Revenue generated", value: revenue },
                { name: "No. of items processed", value: itemsProcessed },
                { name: "Hours saved", value: hoursSaved }
            ]
        };
        const response = await createProject(project);
        onProjectAdded(response.data);
        setName("");
        setType("");
        setOwner("");
        setRevenue("");
        setItemsProcessed("");
        setHoursSaved("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Project Name" />
            <input value={type} onChange={(e) => setType(e.target.value)} placeholder="Project Type" />
            <input value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Project Owner" />
            <h4>Metrics</h4>
            <input value={revenue} onChange={(e) => setRevenue(e.target.value)} placeholder="Revenue generated" />
            <input value={itemsProcessed} onChange={(e) => setItemsProcessed(e.target.value)} placeholder="Items processed" />
            <input value={hoursSaved} onChange={(e) => setHoursSaved(e.target.value)} placeholder="Hours saved" />
            <button type="submit">Add Project</button>
        </form>
    );
};

export default ProjectForm;
