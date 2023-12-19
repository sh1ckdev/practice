import { styled } from "@mui/system";
import AccountPlaceholder from "../assets/images/AccountImage.png";
import AvatarImage from "../assets/images/AvatarAccount.svg";
import {
  Box,
  Avatar,
  Typography,
  Container,
  Button,
  Tooltip,
} from "@mui/material";
import { useContext, useState } from "react";
import CopyAllOutlinedIcon from "@mui/icons-material/CopyAllOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const FullWidthImage = styled("img")({
  display: "block",
  borderRadius: 15,
  width: "100%",
});

const AvatarContainer = styled(Box)({
  position: "relative",
});

const AccountPage = () => {
  const { store } = useContext(Context);
  const [content, setContent] = useState(
    "0xD9832DAF0DE29dFA770e41bf8Ef326f20A6F850F"
  );
  const [tooltipText, setTooltipText] = useState("Нажмите чтобы скопировать");

  const handleCopyClick = () => {
    navigator.clipboard.writeText(content);
    setTooltipText("Скопировано");
  };

  const shortenedContent = `${content.slice(0, 6)}...${content.slice(-4)}`;

  return (
    <div>
      {store.isAuth ? (
        <Container maxWidth="xl">
          <AvatarContainer>
            <FullWidthImage src={AccountPlaceholder} alt="" />
            <Avatar
              src={AvatarImage}
              variant="square"
              sx={{
                width: 130,
                height: 130,
                border: "3px solid #2B2B2B",
                borderRadius: 6,
                position: "absolute",
                top: "80%",
                left: "10%",
              }}
            />
          </AvatarContainer>
          <Container
            maxWidth="lg"
            sx={{
              marginTop: 10,
              padding: "0px!important",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ marginTop: 3 }}>
              <Typography fontWeight={600} fontSize={40}>{store.user.username}</Typography>
              <Typography fontWeight={600} fontSize={25}>{store.user.email}</Typography>
              <Typography color="secondary" fontWeight={600} fontSize={23}>
                Bio
              </Typography>
              <Typography>react developer with big plans</Typography>
            </Box>
            <Box sx={{ marginTop: 3 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Tooltip title={tooltipText} arrow>
                  <Button
                    variant="contained"
                    onClick={handleCopyClick}
                    sx={{ display: "flex", gap: 1, overflow: "hidden" }}
                  >
                    <CopyAllOutlinedIcon />
                    <div
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {shortenedContent}
                    </div>
                  </Button>
                </Tooltip>
                <Button variant="outlined">
                  <AddOutlinedIcon />
                  Follow
                </Button>
              </Box>
            </Box>
          </Container>
        </Container>
      ) : (
        <p>User not authenticated</p>
      )}
    </div>
  );
};

export default observer(AccountPage);
