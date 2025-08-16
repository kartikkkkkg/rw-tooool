import React from "react";

export default function ReportTable({
  reports = [],
  onToggleFavorite = () => {},
  onDownload = () => {},
  onView = () => {}
}) {
  return (
    <div className="table-responsive">
      <table className="table table-borderless align-middle">
        <thead className="table-light">
          <tr>
            <th>Report Name</th>
            <th>Date</th>
            <th>Type</th>
            <th>Folder</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-muted py-4">
                No reports to show
              </td>
            </tr>
          ) : (
            reports.map((r, i) => (
              <tr key={i}>
                <td>{r.name}</td>
                <td>{r.date}</td>
                <td><span className="badge bg-secondary">{r.type}</span></td>
                <td>{r.folder}</td>
                <td><span className={`badge ${r.status === 'Available' ? 'bg-success' : 'bg-warning'}`}>{r.status}</span></td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-outline-primary me-1"
                    title="Download report"
                    onClick={() => onDownload(r)}
                  >⬇</button>

                  <button
                    className={`btn btn-sm me-1 ${r.isFavorite ? "btn-warning" : "btn-outline-warning"}`}
                    title={r.isFavorite ? "Remove from favorites" : "Add to favorites"}
                    onClick={() => onToggleFavorite(r)}
                  >★</button>

                  <button
                    className="btn btn-sm btn-outline-info"
                    title="View report details"
                    onClick={() => onView(r)}
                  >👁</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
