import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";

export default function OpsDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [reports, setReports] = useState([
    { name: "CIF US Indicia Report", date: "2023-06-24", type: "PDF", folder: "Hong Kong FIRMAML General", status: "Available", isFavorite: true },
    { name: "CIF Data Extract", date: "2023-06-23", type: "CSV", folder: "India FIRMAML Report", status: "Available", isFavorite: false },
    { name: "Monthly Periodic Review", date: "2023-06-22", type: "PDF", folder: "Hong Kong FIRMAML General", status: "Available", isFavorite: true },
    { name: "KYC Reports", date: "2023-06-21", type: "Excel", folder: "Compliance", status: "Available  ", isFavorite: false },
    { name: "AML Reports", date: "2023-06-20", type: "PDF", folder: "Compliance", status: "Available", isFavorite: false }
  ]);

  const [recentReports, setRecentReports] = useState(["CIF Data Extract", "Monthly Periodic Review"]);

  // Toggle favorites dynamically
  const toggleFavorite = (reportName) => {
    setReports((prev) =>
      prev.map((r) =>
        r.name === reportName ? { ...r, isFavorite: !r.isFavorite } : r
      )
    );
  };

  // Mark viewed dynamically
  const markAsViewed = (reportName) => {
    setRecentReports((prev) => {
      const updated = [reportName, ...prev.filter((r) => r !== reportName)];
      return updated.slice(0, 5);
    });
  };

  // Filtering logic
  const filteredReports = reports.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      r.status === statusFilter ||
      (statusFilter === "Favorites" && r.isFavorite);
    return matchesSearch && matchesStatus;
  });

  // Favorites
  const favoriteReports = reports.filter((r) => r.isFavorite).map((r) => r.name);

  // Folders list
  const folderList = [...new Set(reports.map(r => r.folder))];

  return (
    <div className="d-flex flex-column vh-100">
      <Header 
        username="Ops User" 
        lastLogin={new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
        notifications={[1, 2]} 
      />

      <div className="d-flex flex-grow-1">
        <Sidebar 
          favorites={favoriteReports}
          lastViewed={recentReports}
          folders={folderList}
          selectedFilter={statusFilter}
          onOpenReport={markAsViewed}
          onFilterChange={(filter) => setStatusFilter(filter === "All Time" ? "All" : filter)}
        />

        <div className="flex-grow-1 p-4 sc-bg-light">
          {/* Search + Filter */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <select
                className="form-select ms-2"
                style={{ maxWidth: "200px" }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Reports</option>
                {[...new Set(reports.map(r => r.status))].map((status, idx) => (
                  <option key={idx} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <button className="btn sc-btn-primary">Bulk Download</button>
          </div>

          {/* Stat Cards */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="sc-card-gradient sc-available">
                <div className="stat-num">{reports.length}</div>
                <div className="stat-label">Total Reports</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="sc-card-gradient sc-favorites">
                <div className="stat-num">{favoriteReports.length}</div>
                <div className="stat-label">Favorites</div>
              </div>
            </div>
          </div>

          {/* Reports Table */}
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>Report Name</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Folder</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report, idx) => (
                  <tr key={idx}>
                    <td>{report.name}</td>
                    <td>{report.date}</td>
                    <td><span className="badge bg-secondary">{report.type}</span></td>
                    <td>{report.folder}</td>
                    <td>
                      <span className="badge bg-success">{report.status}</span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-1"
                        title="Download Report"
                      >
                        ⬇
                      </button>
                      <button
                        className={`btn btn-sm me-1 ${report.isFavorite ? "btn-warning" : "btn-outline-warning"}`}
                        title={report.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                        onClick={() => toggleFavorite(report.name)}
                      >
                        ★
                      </button>
                      <button
                        className="btn btn-sm btn-outline-info"
                        title="View Details"
                        onClick={() => markAsViewed(report.name)}
                      >
                        👁
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
