"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { TextField, Box, Button } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";

export default function Home() {
  const [QRtext, setQRtext] = useState("");
  const [item, setitem] = useState({ name: "", price: 0 });
  const [QRurl, setQRurl] = useState("");

  async function createitem() {
    try {
      const response = await axios.post("http://localhost:3000/item", item);
      alert("item created: " + response.data.name);
      const id = response.data.id;
      setQRtext(`http://localhost:3000/item/${id}`);
      console.log(QRtext);
    } catch (error) {
      alert("error item created: " + error);
    }
  }

  useEffect(() => {
    const QRcanvas = document.getElementById("QRcanvas");
    if (QRcanvas) {
      const url = QRcanvas.toDataURL("image/png");
      console.log(url);
      setQRurl(url);
    }
  }, [QRtext]);

  function print() {
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
        
        <img class="qr" src="${QRurl}" alt="QR Code" />
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
      html += `<img class="qr" src="${QRurl}" alt="QR Code"/>`;
    }

    win.document.write(html);
    win.document.close();

    /*
    document.body.style.backgroundImage = `url(${QRurl})`;
    document.body.style.backgroundRepeat = "repeat";
    window.print();*/
  }

  return (
    <Box component="section" sx={{ p: 2, border: "6px dashed grey", width: 500, height: 600, top: "10%", left: "35%", position: "absolute", display: "flex", flexDirection: "column" }}>
      <label>name</label>
      <TextField sx={{ mb: 4 }} id="filled-basic" label="name" value={item.name} variant="filled" onChange={(e) => setitem({ ...item, name: e.target.value })} />
      <label>price</label>
      <TextField sx={{ mb: 4 }} id="filled-basic" label="price" value={item.price} variant="filled" onChange={(e) => setitem({ ...item, price: Number(e.target.value) })} />
      <Button onClick={createitem} variant="contained">
        create item
      </Button>
      {QRtext && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            mt: 4,
            mb: 4,
            gap: 2,
          }}
        >
          <QRCodeCanvas id="QRcanvas" value={QRtext} />
          <Button onClick={print} variant="contained">
            Print
          </Button>
        </Box>
      )}
    </Box>
  );
}
