import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { addPost } from "../firebase/store";
import { useAuth } from "../firebase/auth";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

function Input({ id, label, value, onChange, ...rest }) {
  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      sx={{ marginBottom: "20px" }}
      {...rest}
    />
  );
}

function CreateAdvert() {
  const [form, setForm] = useState({});
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const handleSubmit = () => {
    console.log(form);
    if (user) {
      addPost({ ...form, seatLeft: parseInt(form.seatLeft) });
      navigate("/posts");
    } else {
      setOpen(true);
    }
  };
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity="warning"
          sx={{ width: "100%" }}
          variant="filled"
        >
          İlan Oluşturmak için giriş yapınız
        </Alert>
      </Snackbar>
      <Input
        id="departurePoint"
        label="Kalkış Noktası"
        onChange={onChange}
        value={form.departurePoint}
      />

      <Input
        id="destination"
        label="Varış Noktası"
        onChange={onChange}
        value={form.destination}
      />

      <Input
        id="departure"
        label="Kalkış Saati"
        onChange={onChange}
        value={form.departure}
      />

      <Input
        id="arrival"
        label="Tahmini Varış Saati"
        margin=""
        onChange={onChange}
        value={form.arrival}
      />

      <Input
        id="carModel"
        label="Arabanın Modeli"
        onChange={onChange}
        value={form.carModel}
      />

      <Input id="price" label="Ücret" onChange={onChange} value={form.price} />

      <Input
        id="seatLeft"
        label="Koltuk Sayısı"
        onChange={onChange}
        value={parseInt(form.seatLeft)}
        type="number"
      />

      <Button onClick={handleSubmit} variant="contained">
        Oluştur
      </Button>
    </div>
  );
}

export default CreateAdvert;
