
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import Wallet from "../assets/images/wallet.svg";
import Collection from "../assets/images/Collection.svg";
import Earning from "../assets/images/Earning.svg";

const How = () => {
  return (
    <div>
      <Container>
        <Typography
          sx={{
            fontSize: 38,
            fontWeight: 700,
            marginTop: 10
          }}
        >
          How it work
        </Typography>
        <Typography
          sx={{
            fontSize: 22,
          }}
        >
          Find out how to get started
        </Typography>
        <Box sx={{ display: "flex", justifyContent: 'space-between', marginTop: 4 }}>
          <Card sx={{ backgroundColor: "#3B3B3B", borderRadius: "20px" }}>
            <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: "center"}}>
              <img src={Wallet} alt="" />
              <Typography fontSize={22} fontWeight={600} color="text" component="div">
              Setup Your wallet
              </Typography>
              <Typography sx={{marginTop: 1}} color="text" maxWidth={280}  fontWeight={300}textAlign="center">
              Set up your wallet of choice. Connect it to the Animarket by clicking the wallet icon in the top right corner.
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ backgroundColor: "#3B3B3B", borderRadius: "20px" }}>
            <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: "center"}}>
              <img src={Collection} alt="" />
              <Typography fontSize={22} fontWeight={600} color="text" component="div">
              Create Collection
              </Typography>
              <Typography sx={{marginTop: 1}} color="text" maxWidth={330}  fontWeight={300}textAlign="center">
              Upload your work and setup your collection. Add a description, social links and floor price.
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ backgroundColor: "#3B3B3B", borderRadius: "20px" }}>
            <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: "center"}}>
              <img src={Earning} alt="" />
              <Typography fontSize={22} fontWeight={600} color="text" component="div">
              Start Earning
              </Typography>
              <Typography sx={{marginTop: 1}} color="text" maxWidth={280}  fontWeight={300}textAlign="center">
              Choose between auctions and fixed-price listings. Start earning by selling your NFTs or trading others.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default How;
