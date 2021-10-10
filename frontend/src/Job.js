import React, { useContext, useState, useEffect } from "react";
import UserContext from "./UserContext";

function Job({ id, title, salary, equity, companyName }) {
  const [applied, setApplied] = useState();
  const { hasAppliedToJob, applyToJob } = useContext(UserContext);

  useEffect(() => {
    setApplied(hasAppliedToJob(id));
  }, [id, hasAppliedToJob]);

  async function handleApply(evt) {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  console.log(salary);

  return (
    <div className="JobCardList">
      <div className="JobCard card">
        <div className="card-body">
          <h6 className="card-title">{title}</h6>

          <p>{companyName}</p>

          {
            <div>
              <small>
                Salary: $
                {salary !== null
                  ? salary
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                  : 0}
              </small>
            </div>
          }

          {
            <div>
              <small>Equity: {equity !== null ? equity : 0}</small>
            </div>
          }

          <button
            className="my-3 btn btn-danger"
            onClick={handleApply}
            disabled={applied}
          >
            {applied ? "Applied" : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Job;
