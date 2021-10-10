import React from "react";
import Job from "./Job";

function JobCards({ jobs }) {
  return (
    <div className="JobCardList">
      {jobs.map((job) => (
        <Job
          key={job.id}
          id={job.id}
          title={job.title}
          salary={job.salary}
          equity={job.equity}
          companyName={job.companyName}
        />
      ))}
    </div>
  );
}

export default JobCards;
