import {
  Container,
  Box,
  Button,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
import { NavLink } from "react-router-dom";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import MainImage from "../assets/images/MainImage.png";
import AvatarImage from "../assets/images/Avatar.svg";
import theme from "../theme/theme";

const StyledLink = styled(NavLink)({
  textDecoration: "none",
  color: "#FFFFFF",
  fontSize: "16px",
  fontWeight: "600",
});

const Main = () => {
  return (
    <div>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginY: 8,
        }}
      >
        <Box
          maxWidth={500}
          sx={{ display: "flex", flexDirection: "column", gap: 4 }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography 
            sx={{ fontWeight: 600, fontSize: 67, lineHeight: "110%" }}
          >
            Discover digital art & Collect NFTs
          </Typography>
          <Typography sx={{ fontWeight: 300, fontSize: 22 }}>
            The NET marketplace user interface created by <Typography component="span" color='primary' fontWeight={500} fontSize={20}>sh1ckdev</Typography>. Collect, buy and sell works of art by more than 20 thousand NFT artists.
          </Typography>
          </Box>
          <StyledLink to="/auth">
            <Button
              color="primary"
              variant="contained"
              sx={{ padding: "15px 40px", display: "flex", gap: "8px" }}
            >
              <RocketLaunchOutlinedIcon />
              Get Started
            </Button>
          </StyledLink>
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Box>
                <Typography sx={{fontSize: 40, color: theme.palette.primary.main, fontWeight: 600}}>240k+</Typography>
                <Typography>Total Sale</Typography>
            </Box>
            <Box>
                <Typography sx={{fontSize: 40, color: theme.palette.primary.main, fontWeight: 600}}>100k+</Typography>
                <Typography>Auctions</Typography>
            </Box>
            <Box>
                <Typography sx={{fontSize: 40, color: theme.palette.primary.main, fontWeight: 600}}>240k+</Typography>
                <Typography>Artists</Typography>
            </Box>
          </Box>
        </Box>

        <Card
          sx={{
            maxWidth: 510,
            maxHeight: 510,
            borderRadius: 5,
            backgroundColor: "#3B3B3B",
            boxShadow: "none",
          }}
        >
          <CardActionArea>
            <CardMedia component="img" image={MainImage} />
            <CardContent>
              <Typography fontWeight={600} fontSize={22}>
                Space Walking
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  marginY: 1,
                }}
              >
                <Avatar src={AvatarImage} sx={{ width: 30, height: 30 }} />
                <Typography fontWeight={300} fontSize={16}>
                  Animakid
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
    </div>
  );
};

export default Main;
