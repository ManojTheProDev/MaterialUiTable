import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
// import type from 'typescript';
import "./App.css";

// Create a infinite scroll app
// Based on first api call, first fold of page will appear
// As user scroll, new api call will be placed and new data will append
// https://cataas.com/api/cats?tags=cute

// interface CatData {
//   created_at: "string";
//   id: "string,";
// }

const PasteItems = (props) => {
  const { data } = props;
  return data.length ? (
    data.map((item) => <div key={item.id}>{item.id}</div>)
  ) : (
    <div>Data loading</div>
  );
};

const columns = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "created_at", headerName: "Created At", width: 200 },
  { field: "tags", headerName: "Tags", width: 200 },
];

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://cataas.com/api/cats?tags=cute")
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setData(res);
      });
  }, []);
  console.log(data);
  return (
    <div style={{ height: 400, width: "100%" }}>
      {/* <PasteItems data={data} /> */}
      {data.length ? (
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      ) : (
        <div>Data loading</div>
      )}
    </div>
  );
}

export default App;
