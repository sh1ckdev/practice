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

const users = [
  { username: "Keepitreal", avatar: require("../assets/images/Avatar1.png") },
  { username: "DigiLab", avatar: require("../assets/images/Avatar2.png") },
  { username: "GravityOne", avatar: require("../assets/images/Avatar3.png") },
  { username: "Juanie", avatar: require("../assets/images/Avatar4.png") },
  { username: "BlueWhale", avatar: require("../assets/images/Avatar4.png") },
  { username: "Mr Fox", avatar: require("../assets/images/Avatar3.png") },
  { username: "Shroomie", avatar: require("../assets/images/Avatar2.png") },
  { username: "Robotica", avatar: require("../assets/images/Avatar1.png") },
];

const Creators = () => {
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
          {users.map((user, index) => (
            <UserCard key={index} {...user} />
          ))}
        </Box>
      </Container>
    </div>
  );
};

export default Creators;
