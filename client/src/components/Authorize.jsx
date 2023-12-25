import {
  Box,
  Card,
  CardMedia,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import AuthImage from "../assets/images/AuthImage.png";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { useContext, useState } from "react";
import { Context } from "../index";
import { useNavigate } from "react-router-dom";

const Authorize = () => {
  const { store } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); 

  const handleLoginAccount = async () => {
    await store.login(username, password);
    if (store.isAuth) {
      navigate(`/account/${username}`); 
    }
  };
  return (
    <Box sx={{ display: "flex", width: "100%", height: "700px", gap: 5 }}>
      <Box sx={{ flex: "1", maxWidth: "50%" }}>
        <Card
          sx={{
            height: "100%",
            backgroundColor: "#3B3B3B",
          }}
        >
          <CardMedia
            component="img"
            image={AuthImage}
            alt="Authentication"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Card>
      </Box>
      <Box
        sx={{
          width: "27%",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 51, fontWeight: 600 }}>
            Authorization
          </Typography>
          <Typography sx={{ fontSize: 22, fontWeight: 300 }}>
            Welcome! enter your details and start creating, collecting and
            selling NFTs.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            id="username"
            placeholder="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "white" }}
          />
          <TextField
            id="password"
            placeholder="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HttpsOutlinedIcon />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "white" }}
          />
          <Button
            onClick={() => {
              store.login(username, password);
              handleLoginAccount();
            }}
            color="primary"
            variant="contained"
            sx={{ padding: "10px", marginTop: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Authorize;
