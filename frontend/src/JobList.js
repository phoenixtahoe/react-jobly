import React, { useState, useEffect } from "react";

import JoblyApi from "./Api";
import JobCards from "./JobCards";
import SearchForm from "./SearchForm";
import LoadingSpinner from "./LoadingSpinner";

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    search();
  }, []);

  async function search(title) {
    let jobs = await JoblyApi.getJobs(title);
    setJobs(jobs);
  }

  if (!jobs) return <LoadingSpinner />;

  return (
    <div className="JobList col-md-6">
      <SearchForm search={search} />
      {jobs.length ? (
        <JobCards jobs={jobs} />
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
}

export default JobList;
