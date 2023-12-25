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
  TextField
} from "@mui/material";
import { useContext, useState,useEffect } from "react";
import CopyAllOutlinedIcon from "@mui/icons-material/CopyAllOutlined";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import Web3 from "web3";

const FullWidthImage = styled("img")({
  display: "block",
  borderRadius: 15,
  width: "100%",
});

const AvatarContainer = styled(Box)({
  position: "relative",
});


const AccountPage = () => {
  const [accountAddress, setAccountAddress] = useState('');
  const [accountAddressSlice, setAccountAddressSlice] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [editedBio, setEditedBio] = useState("React developer with big plans");
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const { store } = useContext(Context);
  const [tooltipText, setTooltipText] = useState("Нажмите чтобы скопировать");

  const handleConnectMetamask = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsMetamaskConnected(true);
      } else {
        console.error('Metamask not detected. Please install Metamask.');
      }
    } catch (error) {
      console.error('Error connecting to Metamask:', error.message);
    }
  };

  useEffect(() => {
    const checkMetamaskConnection = async () => {
      try {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);

          const accounts = await window.web3.eth.getAccounts();
          if (accounts.length > 0) {
            const selectedAccount = accounts[0];
            
            const address = selectedAccount;

            const truncatedAddress =
              address.substring(0, 5) +
              '...' +
              address.slice(-3);
            setAccountAddressSlice(truncatedAddress);

            const balance = await window.web3.eth.getBalance(selectedAccount);
            const formattedBalance = window.web3.utils.fromWei(
              balance,
              'ether'
            );

            setAccountBalance(formattedBalance);
            setAccountAddress(address);
            setIsMetamaskConnected(true);

          } else {
            console.log('Metamask not connected.');
            setIsMetamaskConnected(false);
          }
        } else {
          console.error('Metamask not detected. Please install Metamask.');
        }
      } catch (error) {
        console.error('Error checking Metamask connection:', error.message);
      }
    };

    checkMetamaskConnection();
  }, []);


  const handleCopyClick = () => {
    navigator.clipboard.writeText(accountAddress);
    setTooltipText('Скопировано');
  };


  const handleEditBio = () => {
    setIsEditingBio(true);
  };

  const handleSaveBio = () => {
    console.log("Bio saved:", editedBio);

    setIsEditingBio(false);
  };

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
              <Typography fontWeight={600} fontSize={25} marginTop={2}>
              <Typography component="span" color="secondary" fontWeight={600} fontSize={23}>
                Email:
              </Typography> {store.user.email}</Typography>
              <Typography color="secondary" fontWeight={600} fontSize={23} marginTop={3}>
                Bio: 
              </Typography>
              {isEditingBio ? (
            <>
                      <TextField
                type="text"
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                sx={{backgroundColor: "grey"}}
          />
              <Button variant="contained" onClick={handleSaveBio}>
                Save
              </Button>
            </>
          ) : (
            <Box sx={{display: 'flex'}}>
              <Typography>{editedBio}</Typography>
                <Typography
                  onClick={handleEditBio}
                  sx={{marginLeft: 1}}
                >
                  <EditOutlinedIcon color="primary" /> 
                </Typography>
            </Box>
          )}
            </Box>
            <Box sx={{ marginTop: 3 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
              {isMetamaskConnected  ? (
                <>
              <Button
                    variant="outlined"
                    sx={{ display: "flex", gap: 1, overflow: "hidden", borderColor: "#1DCB68!important", color: "#1DCB68" }}
                  >
                    <AccountBalanceWalletIcon />
                    {accountBalance}0 ETH
                    
                  </Button>
                <Tooltip title={tooltipText} arrow>
                  <Button
                    variant="contained"
                    onClick={handleCopyClick}
                    sx={{ display: "flex", gap: 1, overflow: "hidden" }}
                  >
                    <CopyAllOutlinedIcon />
                    {accountAddressSlice}
                    
                  </Button>
                </Tooltip>
                </>
                ) : null}
                <Button
            id="connectButton"
            variant="contained"
            onClick={handleConnectMetamask}
            style={{ display: isMetamaskConnected ? 'none' : 'block' }}
          >
            Connect to Metamask
          </Button>
              </Box>
            </Box>
          </Container>
        </Container>
      ) : (
        <h1>User not authenticated</h1>
      )}
    </div>
  );
};

export default observer(AccountPage);
