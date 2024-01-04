import React from "react";
import DataTable from 'react-data-table-component';
import './DataGrid.css';
const ExpandedComponent = ({ data }) => {
    return (
        <div>
            <ul className="app-list">
                {uniqueApps(data.apps).map((app, index) => (
                    <li key={index} className="app-item">
                        <strong  className="app-name">Name:</strong> {app.name}
                        {app.version && app.version !== 'N/A' && (
                            <span  className="app-version"> | <strong>Version:</strong> {app.version}</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const uniqueApps = (apps) => {
    const seen = new Map();

    return apps.filter(app => {
        if (!seen.has(app.name)) {
            seen.set(app.name, app.version);
            return true;
        }
        if (app.version && seen.get(app.name) !== app.version) {
            seen.set(app.name, app.version); // Update with new version
            return true;
        }
        return false;
    });
};


const columns = [
    {
        name: 'Domain',
        selector: row => row.domain,
    },
    {
        name: 'Host',
        selector: row => row.host,
    },
    {
        name: 'IP',
        selector: row => row.ip,
    }
];

const DataGrid = ({hosts,page,limit,handlePageChange,handlePerRowsChange, loading}) => {

    let totalRows = 0;
    totalRows = hosts.length + 1 + (page - 1) * limit;

    return (
        <DataTable
            columns={columns}
            data={hosts}
            progressPending={loading}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            paginationRowsPerPageOptions={[20, 50, 100]}
            paginationPerPage={limit}
            paginationDefaultPage={page}
        />
    );
}

export default DataGrid;
