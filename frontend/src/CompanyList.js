import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

import SearchForm from "./SearchForm";
import JoblyApi from "./Api";

function CompanyList() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    search();
  }, []);

  async function search(name) {
    let companies = await JoblyApi.getCompanies(name);
    setCompanies(companies);
  }

  return (
    <section className="col-md-8">
      <SearchForm search={search} />
      {companies.length ? (
        <div>
          {companies.map((items) => (
            <Link
              style={{ color: "black", textDecoration: "none" }}
              to={`/companies/${items.handle}`}
              key={items.handle}
            >
              <Card className="p-2">
                <CardBody>
                  <CardTitle className="text-left font-weight-bold">
                    {items.name}
                  </CardTitle>
                  <CardText className="text-center">
                    {items.description}
                  </CardText>
                  {items.logoUrl && (
                    <img
                      style={{ height: "50px" }}
                      src={items.logoUrl}
                      alt={items.name}
                      className="float-right ml-5"
                    />
                  )}
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p>Sorry, no results were found!</p>
      )}
    </section>
  );
}

export default CompanyList;
