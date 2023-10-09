import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const DatatableCore = ({
  data,
  columns,
  title,
  setLimitNumber,
  setSearchValue,
  nextPage,
  previousPage,
}) => {
  const buttonsData = [
    {
      to: "tambah",
      className: "btn btn-panduan",
      icon: "bi bi-question-circle",
      text: "Panduan",
    },
    {
      to: "tambah",
      className: "btn btn-add",
      icon: "bi bi-plus-circle-dotted",
      text: "Tambah",
    },
    {
      to: "tambah",
      className: "btn btn-import",
      icon: "bi bi-cloud-arrow-up",
      text: "Import",
    },
    {
      to: "tambah",
      className: "btn btn-print",
      icon: "bi bi-printer",
      text: "Print",
    },
  ];

  return (
    <>
      <p className="h2 my-3">{title}</p>
      <div className="container-fluid bg-white content-table p-2">
        <div>
          <div className="row">
            <div className="d-flex justify-content-end mb-2">
              {buttonsData.map((button, index) => (
                <Link
                  key={index}
                  to={button.to}
                  className={`btn ${button.className} mx-1`}
                >
                  <div className="d-md-block d-none">
                    <i className={button.icon}></i> {button.text}
                  </div>
                  <div className="d-md-none d-bock">
                    <i className={button.icon}></i>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <select
                className="btn btn-filter"
                name=""
                id=""
                onChange={(e) => setLimitNumber(parseInt(e.target.value))}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
            <div className="col">
              <form className="d-flex" role="search">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                    className="form-control"
                    placeholder="Cari "
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-sm align-middle">
              <thead>
                <tr>
                  {columns.map((col, index) => (
                    <th scope="col" key={index}>
                      {col.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((col, colIndex) => (
                      <td key={colIndex}>
                        {typeof col.selector === "function"
                          ? col.selector(row)
                          : row[col.selector]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col">
              <ul className="pagination justify-content-end">
                <li>
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => previousPage()}
                  >
                    Previous
                  </a>
                </li>

                <li>
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => nextPage(data[data.length - 1].data.search)}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
