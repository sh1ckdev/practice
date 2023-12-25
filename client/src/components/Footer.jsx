import { Box, Button, InputAdornment, TextField, Typography, Divider } from "@mui/material"
import { Container } from "@mui/system"
import Logo from '../assets/images/logo.svg'
import { Link } from "react-router-dom"
import styled from "@emotion/styled";

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "#858584",
  fontSize: "16px",
});

const Footer = () => {
  return (
    <>
      <Box sx={{backgroundColor: '#3B3B3B'}}>
        <Container>
        <Box sx={{paddingTop: 10, display: 'flex', gap: 10}}>
          <Box maxWidth={260}>
            <img src={Logo} alt="" />
            <Typography color="secondary" marginTop={2}>NFT marketplace UI created with sh1ck.dev for Figma.</Typography>
            <Typography color="secondary" marginTop={3}>Join our community</Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}>
            <Typography sx={{ fontSize: 22, fontWeight: 600}}>Explore</Typography>
            <StyledLink >Marketplace</StyledLink>
            <StyledLink  >Rankings</StyledLink>
            <StyledLink>Connect a wallet</StyledLink>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}>
            <Typography sx={{ fontSize: 22, fontWeight: 600}}>Join our weekly digest</Typography>
            <Typography color="secondary">Get exclusive promotions & updates straight to your inbox.</Typography>
            <TextField
      variant="outlined"
      sx={{backgroundColor: "#fff"}}
      placeholder="Enter your email here"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
              <Button color="primary" variant="contained" sx={{padding: "12px 40px"}}>Subscribe</Button>
          </InputAdornment>
        ),
      }}
    />
          </Box>
        </Box>
        <Divider sx={{
          borderWidth: 1,
          backgroundColor: "#858584",
          marginTop: 3
        }} />
        <Typography color="secondary" sx={{paddingY: 3}}>Ⓒ NFT Market. Use this template freely.</Typography>
        </Container>
      </Box>
    </>
  )
}

export default Footer
