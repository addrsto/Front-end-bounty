import React, {
  useState, useContext, useEffect,
} from 'react';
import styled from 'styled-components';
import {
  Box,
} from 'reflexbox';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core';
import {
  Title,
  Text,
  Row,
  Button,
} from '../../style/components';

import SearchFormManager from '../searchForm/searchFormManager';
import { useWalletModalToggle } from '../WalletModal/state';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import WalletModal from '../WalletModal';

import LogInModal from '../logInModal';
import LostPasswordModal from '../lostPasswordModal';
import RegisterModalFull from '../registerModalFull';
import DuplicateContext from '../context/DuplicateContext';

import {
  logInUser,
  logInUserFromGoogle,
  resetPassword,
  registerUser,
  registerHandle,
  isHandleAvailable,
    logInUserCustom
} from '../../utils/handleManager';

import {
  returnErrorMessage,
} from '../../utils/errorHandler';
import WalletModal from "../WalletModal";

import { ethers } from "ethers"

import {APIADDRESS} from "../constants"
import * as firebase from "firebase";


const BigTitle = styled(Title)`
  font-size: 32px;
`;

const SubTitle = styled(Text)`
  font-size: 16px;
  font-weight: 600;
`;


function Home() {
  const [isLogInModalOpen, toggleLogInModal] = useState(false);
  const [logInError, setLogInError] = useState('');

  const [isRegisterModalOpen, toggleRegisterModal] = useState(false);
  const [registerError, setRegisterError] = useState('');

  const [isLostPasswordModalOpen, toggleLostPasswordModal] = useState(false);
  // @ts-ignore
  const [isduplicate, toggleisduplicate] = useContext(DuplicateContext);

  const { account,library } = useWeb3React();
  const toggleWalletModal = useWalletModalToggle();

  console.log(account);

  useEffect(() => {
    toast.warning('WARNING - WE ARE IN BETA.\n\n ALL DATA AND ACCOUNTS WILL BE RESET AT LAUNCH', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, []);

  async function logInUserFromModal(email: string, password: string, setLogInError1: Function) {
    toggleisduplicate(false);
    try {
      await logInUser(email, password);
    } catch (e) {
      setLogInError1(returnErrorMessage(e.code));
    }
  }

  async function GoogleSignIn(setLogInError2: Function) {
    toggleisduplicate(false);
    try {
      await logInUserFromGoogle();
    } catch (e) {
      setLogInError2(returnErrorMessage(e.code));
    }
  }

  async function MetamaskLogin(setLogInError2: Function) {
    toggleisduplicate(false);

    if (account === "" || ! account) {
      toggleWalletModal()
      return
    }

    try {
      let nonce = await axios.post(APIADDRESS + "/api/getnonce", {
        address: account
      })
      console.log(nonce)

      if (!nonce["data"]["NONCE"]) {
        setLogInError2("Nonce could not be retrieved")
      }

      // Sign the string message
      let signer = library.getSigner()
      let signature = await signer.signMessage(nonce["data"]["NONCE"])

      let resp = await axios.post(APIADDRESS + "/api/verify", {
        address: account,
        signature: signature
      })

      if (!resp["data"]["TOKEN"]) {
        setLogInError2("Token could not be retrieved")
      }

      await logInUserCustom(resp["data"]["TOKEN"]);

      //await logInUserFromGoogle();
      console.log("test")
    } catch (e) {
      console.log(e)
      setLogInError2(returnErrorMessage(e.code));
    }
  }



  async function MetamaskSignUp(handle:string, setRegisterError1: Function) {
    toggleisduplicate(false);

    if (account === "" || !account) {
      toggleWalletModal()
      return
    }

    const resavailable = await isHandleAvailable(handle);

    if (resavailable) {
      try {
        let nonce = await axios.post(APIADDRESS + "/api/getnonce", {
          address: account
        })
        console.log(nonce)

        if (!nonce["data"]["NONCE"]) {
          returnErrorMessage("Nonce could not be retrieved")
        }

        // Sign the string message
        let signer = library.getSigner()
        let signature = await signer.signMessage(nonce["data"]["NONCE"])

        let resp = await axios.post(APIADDRESS + "/api/verify", {
          address: account,
          signature: signature
        })

        if (!resp["data"]["TOKEN"]) {
          returnErrorMessage("Token could not be retrieved")
        }

        const res  = await logInUserCustom(resp["data"]["TOKEN"]);
        if (res.user !== null && res.user.uid !== null) {
          await registerHandle(handle, res.user.uid);
        }
      } catch (e) {
        console.log('error');
        toggleisduplicate(true);
        console.log(e);

        setRegisterError1(returnErrorMessage(e.code));
      }
    } else {
      setRegisterError1(returnErrorMessage('reg/na'));
    }
  }

  async function GoogleSignUp(handle:string, setRegisterError1: Function) {
    toggleisduplicate(false);
    const resavailable = await isHandleAvailable(handle);

    if (resavailable) {
      try {
        const res = await logInUserFromGoogle();
        if (res.user !== null && res.user.uid !== null) {
          await registerHandle(handle, res.user.uid);
        }
      } catch (e) {
        console.log('error');
        toggleisduplicate(true);
        console.log(e);

        setRegisterError1(returnErrorMessage(e.code));
      }
    } else {
      setRegisterError1(returnErrorMessage('reg/na'));
    }
  }

  async function registerUserAndRegisterHandle(
    email: string,
    password: string,
    handle: string,
    setRegisterError2: Function,
  ) {
    toggleisduplicate(false);
    const resavailable = await isHandleAvailable(handle);

    if (resavailable) {
      try {
        const res = await registerUser(email, password);

        if (res.user !== null && res.user.uid !== null) {
          await registerHandle(handle, res.user.uid);
        }
      } catch (e) {
        console.log(e.code);

        setRegisterError2(returnErrorMessage(e.code));
      }
    } else {
      setRegisterError2(returnErrorMessage('reg/na'));
    }
  }

  async function signInMetamask() {
    let message = "Sign In To Addrs";

    // Sign the string message
    let signer = library.getSigner()
    let signature = await signer.signMessage(message)

    try {
      await logInUserCustom(signature);
    } catch (e) {
      setLogInError(returnErrorMessage(e.code));
    }

    console.log("logged")
  }

  async function signMessage() {
    let message = "Hello World";
    console.log(1233)

// Sign the string message
    let signer = library.getSigner()
    let signature = await signer.signMessage(message)
    console.log(signature)


    const signerAddress = ethers.utils.verifyMessage(message, signature);

console.log(signerAddress)
  }

  return (
    <>
      <RegisterModalFull
        isOpen={isRegisterModalOpen}
        onRegister={(email: string, password: string, handle: string) => registerUserAndRegisterHandle(email, password, handle, setRegisterError)}
        onGoogleSignIn={(handle: string) => GoogleSignUp(handle, setRegisterError)}
        onMetamaskRegister={(handle: string) => MetamaskSignUp(handle, setRegisterError)}
        toggle={() => toggleRegisterModal(!isRegisterModalOpen)}
        error={registerError}
      />
      <LogInModal
        isOpen={isLogInModalOpen}
        toggle={() => toggleLogInModal(!isLogInModalOpen)}
        onLogIn={(email: string, password: string) => logInUserFromModal(email, password, setLogInError)}
        onGoogleSignIn={() => GoogleSignIn(setLogInError)}
        onMetamaskLogIn={() => MetamaskLogin(setLogInError)}
        toggleLostPassword={() => toggleLostPasswordModal(!isLostPasswordModalOpen)}
        error={logInError}
      />
      <LostPasswordModal
        isOpen={isLostPasswordModalOpen}
        toggle={() => toggleLostPasswordModal(!isLostPasswordModalOpen)}
        onPasswordReset={(email: string) => resetPassword(email)}
      />
      <Row width="50%" padding="10px 0" margin="auto">
        <BigTitle noMargin>
          addrs
        </BigTitle>
      </Row>

      <Row width="50%" padding="0 0 10px 0" margin="auto">
        <SubTitle noMargin centered>
          Send and Receive Crypto Without Addresses
        </SubTitle>
      </Row>
      <Box width={[1, 1 / 2]} padding="20px 20px" margin="auto">
        <SearchFormManager />
      </Box>
      <Row width="50%" padding="10px 0" margin="auto">
        <Text noMargin centered small>
          Already have an account?
        </Text>
        <Button
            genre="primary"
            onClick={() => toggleLogInModal(!isLogInModalOpen)}
        >
          LOG IN
        </Button>
      </Row>
      <Row width="50%" padding="10px 0" margin="auto">
        <Text noMargin centered small>
          Want to register an account?
        </Text>
        <Button
            genre="primary"
            onClick={() => toggleRegisterModal(!isRegisterModalOpen)}
        >
          REGISTER
        </Button>
      </Row>
      <WalletModal/>
      <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
      />
    </>
  );
}

export default Home;
