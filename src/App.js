import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from "react";
import Layout from "./components/Layout";
import {Routes, Route} from "react-router-dom";
import Home from './components/home/Home';

function App() {

  const [hosts, setHosts] = useState([]);
  const [apps, setAppList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async (appName, version, page, limit) => {
    setLoading(true);
    try {

      if (appName) {

        // Initialize the payload
        let payload = {
          sort: "host",
          order: "asc",
          limit: limit,
          page: page,
          filters: [{ name: "name", value: appName }]
        };

        // Conditionally add a version filter
        if (version != null && version !== "" ) {
          payload.filters.push({ name: "version", value: version });
        }

        // Send the POST request with the payload
        const response = await api.post('/search-tech-stack', payload);


        setHosts(response.data);
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false);
  }

  const getAppList = async () => {
    try {
      const response = await api.get('/app-names');
      setAppList(response.data);
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    getAppList();
  }, []);

  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home hosts={hosts} apps={apps} getData={getData} loading={loading} />} ></Route>
            </Route>
        </Routes>
    </div>
  );
}

export default App;
