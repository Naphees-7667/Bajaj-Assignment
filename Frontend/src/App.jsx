import React, { useState } from "react";
import Select from "react-select";
// import "./App.css";

const API_URL = "https://backendddd-o2uz.onrender.com/bfhl";

const options = [
  { value: "alphabets", label: "Alphabets" },
  { value: "numbers", label: "Numbers" },
  { value: "highest_alphabet", label: "Highest Alphabet" },
];

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    try {
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error("Invalid JSON structure");
      }
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });
      const result = await res.json();
      setResponse(result);
    } catch (err) {
      setError("Invalid JSON format or API error");
    }
  };

  const filteredResponse = () => {
    if (!response) return null;
    let filteredData = {};
    selectedFilters.forEach((filter) => {
      if (response[filter.value] !== undefined) {
        filteredData[filter.label] = response[filter.value];
      }
    });
    return filteredData;
  };

  return (
    <div className="app-container">
      <h1>BFHL API Frontend</h1>
      <textarea
        placeholder='Enter JSON (e.g. { "data": ["A", "1", "B"] })'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p className="error">{error}</p>}
      {response && (
        <>
          <Select
            options={options}
            isMulti
            onChange={setSelectedFilters}
            placeholder="Select filters"
          />
          <div className="response-output">
            <h2>Filtered Response:</h2>
            <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
          </div>
        </>
      )}
    </div>
  );
};

export default App;