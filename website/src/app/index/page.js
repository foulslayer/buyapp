"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { TextField, Box, Button } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import axios, { Axios } from "axios";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import Paper from "@mui/material/Paper";

export default function Index() {
  const [rows, setrows] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get("http://localhost:3000/item");
        console.log(response.data);
        setrows(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, []);

  const router = useRouter();
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130, hide: true },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 90,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            onClick={() => {
              localStorage.setItem("editData", JSON.stringify(params.row));
              router.push(`/edit/${params.row.id}`);
            }}
          >
            Edit
          </Button>
        );
      },
    },
    {
      field: "udskriv",
      headerName: "Udskriv",
      width: 150,
      renderCell: (params) => {
        return (
          <Button variant="contained" onClick={() => print(params.row.id)}>
            Udskriv
          </Button>
        );
      },
    },
    {
      field: "qrcode",
      headerName: "QRcode",
      width: 150,
      renderCell: (params) => {
        return <QRCodeCanvas id={`QRcanvas${params.row.id}`} value={`http://localhost:3000/item/${params.row.id}`} />;
      },
    },
    /* {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },*/
  ];

  /*const rows = [
    { id: 1, name: "Snow", price: 10 },
    { id: 2, name: "ano", price: 30 },
    { id: 3, name: "Snow", price: 2 },
  ];*/

  const paginationModel = { page: 0, pageSize: 8 };

  function print(id) {
    const QRcanvas = document.getElementById(`QRcanvas${id}`);
    const url = QRcanvas.toDataURL("image/png");
    const win = window.open("", "_blank");

    let html = `
    <html>
      <head>
        <style>
          .qr {
            border: 6px solid grey;
          }
        </style>
      </head>
      <body>
        
        <img class="qr" src="${url}" alt="QR Code" />
      </body>
    </html>
  `;

    html += `
   <script>
     window.onload = function(){
      window.focus();
      window.print();
   };
   </script>
 </body>
</html>  `;

    for (let i = 1; i <= 23; i++) {
      html += `<img class="qr" src="${url}" alt="QR Code"/>`;
    }

    win.document.write(html);
    win.document.close();
  }

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel },
          columns: {
            columnVisibilityModel: {
              qrcode: true,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
