import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./Api";
import JobCards from "./JobCards";
import LoadingSpinner from "./LoadingSpinner";

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getCompany() {
      setCompany(await JoblyApi.getCompany(handle));
    }

    getCompany();
  }, [handle]);

  if (!company) return <LoadingSpinner />;

  return (
    <div className="CompanyDetail col-md-6">
      <h4>{company.name}</h4>
      <p>{company.description}</p>
      <JobCards jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;
