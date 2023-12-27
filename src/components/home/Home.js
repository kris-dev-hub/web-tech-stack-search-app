import React, {useState, useEffect, useCallback} from "react";
import DataGrid from '../dataGrid/DataGrid';
import { debounce } from 'lodash';
import './Home.css';

const Home = ({hosts, apps, getData, loading}) => {

    const [version, setVersion] = useState('');
    const [selectedApp, setSelectedApp] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);


    const handleSelectChange = (event) => {
        setSelectedApp(event.target.value);
        setVersion('');
        getData(event.target.value, '',1, limit);
    }

    const debouncedGetData = useCallback(
        debounce((app, ver, page, limit) => getData(app, ver, page, limit), 2000),
        [] // getData is assumed to be stable and doesn't change between renders
    );

    const handleVersionChange = (event) => {
        setVersion(event.target.value);
        setPage(1);
        debouncedGetData(selectedApp, event.target.value, 1, limit);
    };

    useEffect(() => {
        if (selectedApp && version) {
            debouncedGetData(selectedApp, version, page, limit);
        }
    }, [selectedApp, version, debouncedGetData]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        getData(selectedApp, version, newPage, limit);
    };

    const handlePerRowsChange = (newLimit) => {
        setLimit(newLimit);
        setPage(1);
        getData(selectedApp, version, 1, newLimit);
    };

    return (
        <div>
            <header className="header">
                <h1>Tech stack search</h1>
            </header>
            <section className="description">
                <p>
                    Introducing the Tech Stack Search Tool, a tool for developers, tech enthusiasts, and website owners.
                    This user-friendly tool is designed to reveal the technology stack of any website, making it
                    invaluable for competitive analysis, tech exploration, and market research. Whether you're assessing
                    your own site's tech framework, scoping out competitors, or just curious about web technologies,
                    this tool simplifies the process. Ideal for strategizing development plans or staying ahead in tech
                    trends, it's a boon for both tech veterans and novices. Plus, it's free to start, offering essential
                    insights without any initial investment. Unlock the power of technology intelligence and elevate
                    your web presence effortlessly!
                </p>
            </section>

            <div className="select-input-container">
                <select className="app-select" onChange={handleSelectChange}>
                    <option value="">Select application</option>
                    {apps.map((app, index) => (
                        <option key={index} value={app}>
                            {app}
                        </option>
                    ))}
                </select>

                <input
                    className="version-input"
                    type="text"
                    placeholder="Enter version"
                    value={version}
                    onChange={handleVersionChange}
                />
            </div>

            <DataGrid hosts={hosts} page={page} limit={limit} handlePageChange={handlePageChange}
                      handlePerRowsChange={handlePerRowsChange} loading={loading}/>
        </div>
    );
}

export default Home;
