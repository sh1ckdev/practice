import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import { Context } from "../index";
import { useContext, useEffect, useState } from "react";

const UserCard = ({ username, avatar }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#3B3B3B",
        borderRadius: "20px",
        width: 270,
        height: 250,
      }}
    >
      <CardContent
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <Avatar sx={{ width: 150, height: 150 }} src={avatar} alt={username} />
        <Typography sx={{ marginTop: 2, fontWeight: 600 }}>
          {username}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Creators = () => {
  const [usersArray, setUsersArray] = useState([]);
  const { store } = useContext(Context);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await store.getUsers();
        const usersArray = Object.values(store.users).map(user => ({
          username: user,
        }));
        setUsersArray(usersArray)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [store]);
  return (
    <div>
      <Container sx={{ marginY: 15 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'flex-end' }}>
          <Box>
            <Typography
              sx={{
                fontSize: 38,
                fontWeight: 700,
              }}
            >
              Top creators
            </Typography>
            <Typography
              sx={{
                fontSize: 22,
              }}
            >
              Checkout Top Rated Creators on the NFT Marketplace
            </Typography>
          </Box>
          <Button
            color="primary"
            variant="outlined"
            sx={{
              padding: "0px 40px",
              display: "flex",
              gap: "8px",
              width: "auto", 
              height: "60px", 
            }}
          >
            <RocketLaunchOutlinedIcon />
            <Typography color="text.primary">
            View Rankings
            </Typography>
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 3,
            marginTop: 4,
          }}
        >
          {usersArray.map((user, index) => (
            <UserCard key={index} {...user} />
          ))}
        </Box>

<telegram>
  <sh1ckdev/>
</telegram>

      </Container>
    </div>
  );
};

export default Creators;
