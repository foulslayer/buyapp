"use client";
import { TextField, Box, Button } from "@mui/material";
/*import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import { useRouter } from "next/router";*/
import { useState, useEffect } from "react";

export default function Index() {
  const [previousData, setpreviousData] = useState(" ");

  useEffect(() => {
    async function saved() {
      const savedData = localStorage.getItem("editData");
      setpreviousData(savedData);
    }
    saved();
  }, []);


  async function update(){
     const response = await axios.post("http://localhost:3000/item", item);
  }

  // const router = useRouter();
  //const { id, name, price } = router.query;

  return (
    <Box component="section" sx={{ p: 2, border: "6px dashed grey", width: 500, height: 600, top: "10%", left: "35%", position: "absolute", display: "flex", flexDirection: "column" }}>
      <label> present: name {previousData?.name}</label>

      <label>present: price{previousData?.price}</label>

      <label> new name</label>
      <TextField sx={{ mb: 4 }} id="filled-basic" label="name" value={previousData?.name} variant="filled" onChange={(e) => setitem({ ...item, name: e.target.value })} />
      <label>new price</label>
      <TextField sx={{ mb: 4 }} id="filled-basic" label="price" value={previousData?.price} variant="filled" onChange={(e) => setitem({ ...item, price: Number(e.target.value) })} />

      {/*   <Button onClick={update} variant="contained">
        update item
      </Button> */}
    </Box>
  );
}
