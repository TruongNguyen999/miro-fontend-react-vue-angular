import React from "react";
import { useParams } from "react-router-dom";
import "./ProjectContent.css";

const ProjectContent = () => {
  const { project } = useParams();

  return (
    <h2 className="project-title">
      {project === "angular" ? "Angular Microfrontend" : "Vue Microfrontend"}
    </h2>
  );
};

export default ProjectContent;
