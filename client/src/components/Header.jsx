import { AppBar, Toolbar, Container, Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import { NavLink } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";


const CustomAppBar = styled(AppBar)({
  backgroundColor: "#2B2B2B",
  boxShadow: "none",
});

const StyledLink = styled(NavLink)({
  textDecoration: "none",
  color: "#FFFFFF",
  marginLeft: "50px",
  fontSize: "16px",
  fontWeight: "600",
  "&.active": {
    color: "#A259FF",
  },
});

const MuiLink = styled(NavLink)({
  textDecoration: "none",
  color: "#FFFFFF",
  fontSize: "16px",
  fontWeight: "600",
});

const Header = () => {
  const { store } = useContext(Context);

  return (
    <CustomAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginY: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <StyledLink to="/">
              <img src={Logo} alt="Logo" />
            </StyledLink>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <StyledLink to="/">Marketplace</StyledLink>
            <StyledLink to="/reviews">Reviews</StyledLink>
            <StyledLink to="/account">Connect a wallet</StyledLink>
            {store.isAuth ? (
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <MuiLink  to={`/account/${store.user.username}`}>
                  <Button
                    color="primary"
                    variant="outlined"
                    sx={{
                      marginX: 3,
                      padding: "10px 30px",
                      display: "flex",
                      gap: "8px",
                      textTransform: 'none'
                    }}
                  >
                    <PersonOutlineIcon />
                    Profile
                  </Button>
                </MuiLink>
                <MuiLink sx={{textDecoration: 'none'}} to="/register">
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{
                      padding: "10px 30px",
                      display: "flex",
                      gap: "8px",
                    }}
                    onClick={() => store.logout()}
                  >
                    <LogoutIcon />
                    Logout
                  </Button>
                </MuiLink>
              </Box>
            ) : (
              <StyledLink to="/register">
                <Button
                  color="primary"
                  variant="contained"
                  sx={{
                    marginX: 3,
                    padding: "10px 30px",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <PersonOutlineIcon />
                  Sign Up
                </Button>
              </StyledLink>
            )}
          </Box>
        </Toolbar>
      </Container>
    </CustomAppBar>
  );
};

export default observer(Header);
