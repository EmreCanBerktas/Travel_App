import {
  Card as MuiCard,
  CardContent,
  Button,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import StarIcon from "@mui/icons-material/Star";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Cat from "../Cat.jpg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { getUser } from "../firebase/store";

const theme = createTheme({});

function Card({
  arrival,
  carModel,
  departure,
  price,
  seatLeft,
  onSubmit,
  departurePoint,
  destination,
  driveruid,
}) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const data = getUser(driveruid);
    data.get().then((doc) => {
      setUser(doc.data());
    });
  }, [driveruid]);
  return (
    <ThemeProvider theme={theme}>
      <MuiCard
        sx={{
          maxWidth: 600,
          maxHeight: 250,
          backgroundColor: "#4234FB",
          boxShadow: "0px 0px 10px #291528",
          m: "20px auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ paddingBottom: 0 }}>
          <Box sx={{ display: "flex" }}>
            <Box>
              <Box sx={{ color: "white", fontFamily: "" }}>
                Kalkış: {departure}
              </Box>
              <Box sx={{ color: "white" }}> Varış: {arrival}</Box>
            </Box>
            <Box>
              <Box sx={{ display: "flex", marginLeft: 3 }}>
                <Box sx={{ color: "white" }}>{departurePoint}</Box>
                <ArrowRightAltIcon sx={{ color: "white" }} />
                <Box sx={{ color: "white" }}>{destination}</Box>
              </Box>
            </Box>
            <Box sx={{ marginLeft: "auto", color: "white" }}>{price} ₺</Box>
          </Box>
          <Box
            sx={{
              alignItems: "flex-end",
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Avatar
                alt="user image"
                src={user ? user.photoURL : Cat}
                sx={{
                  width: 50,
                  height: 50,
                  boxShadow: "1px 1px 2rem rgba(0, 0, 0, 0.3)",
                }}
              />
              <Box sx={{ marginLeft: 1 }}>
                <Typography sx={{ color: "white" }}>
                  {user?.displayName}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ color: "white" }}>{user?.rate}</Typography>
                  <StarIcon sx={{ color: "white" }} />
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <DirectionsCarIcon sx={{ color: "white" }} />
              <Typography sx={{ color: "white" }}>{carModel}</Typography>
            </Box>
            <Box>
              {seatLeft > 0 && (
                <Button
                  onClick={onSubmit}
                  size="small"
                  variant=""
                  display="flex"
                  sx={{
                    marginLeft: "auto",
                    border: "none",
                    outline: "none",
                    padding: "",
                    borderRadius: "50px",
                    color: "white",
                    fontSize: "1rem",
                    transition: "all .2s ease-in",
                    textDecoration: "none",
                    backgroundColor: "#74CBFB",
                    "&:hover": {
                      backgroundColor: "#74CBFB",
                      color: "white",
                    },
                  }}
                >
                  Yer Ayırt {seatLeft}
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </MuiCard>
    </ThemeProvider>
  );
}

export default Card;
