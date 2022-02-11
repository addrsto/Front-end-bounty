import React, {
  useState,
  useEffect, useContext,
} from 'react';

import SearchForm from '.';
import RegisterModal from '../registerModal';

import {
  isHandleAvailable,
  registerUser,
  registerHandle, logInUserFromGoogle, logInUserCustom,
} from '../../utils/handleManager';

import {
  returnErrorMessage,
} from '../../utils/errorHandler';

import {
  Error,
  Valid,
  Text,
  NavLink,
} from '../../style/components';
import DuplicateContext from "../context/DuplicateContext";
import axios from "axios";
import {APIADDRESS} from "../constants";
import {useWeb3React} from "@web3-react/core";
import {useWalletModalToggle} from "../WalletModal/state";

function validateHandle(handle: string) {
  if (handle.match(/^[a-z0-9-_]+$/) === null) {
    return 'Addrs is not valid. Addrs can only contain letters, numbers and \'-\' or \'_\'.';
  }

  if (handle.length < 3) {
    return 'Addrs is too short! Addrs must contain at least 3 characters.';
  }

  if (handle.length > 100) {
    return 'Addrs is too long! Addrs must contain less than 100 characters';
  }

  return '';
}

function SearchFormManager() {
  const [handle, setHandle] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [hasBeenChecked, setHasBeenChecked] = useState(false);

  const [isRegisterModalOpen, toggleRegisterModal] = useState(false);
  const [registerError, setRegisterError] = useState('');

  const { account,library } = useWeb3React();
  const toggleWalletModal = useWalletModalToggle();
  // @ts-ignore
  const [isduplicate, toggleisduplicate] = useContext(DuplicateContext);

  async function registerUserAndRegisterHandle(
      email: string,
      password: string,
      handle1: string,
      setRegisterError1: Function,
  ) {
    toggleisduplicate(false);
    try {
      const res = await registerUser(email, password);

      if (res.user !== null && res.user.uid !== null) {
        await registerHandle(handle1, res.user.uid);
      }
    } catch (e) {
      setRegisterError1(returnErrorMessage(e.code));
    }
  }


  async function MetaMaskLogin(handle2:string, setRegisterError2: Function) {
    toggleisduplicate(false);
    const resavailable = await isHandleAvailable(handle2);

    if (account === "" || ! account) {
      toggleWalletModal()
      return
    }

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
          await registerHandle(handle2, res.user.uid);
        }
      } catch (e) {
        toggleisduplicate(true);
        setRegisterError2(returnErrorMessage(e.code));
      }
    } else {
      setRegisterError2(returnErrorMessage('reg/na'));
    }
  }

  async function GoogleSignUp(handle2:string, setRegisterError2: Function) {
    toggleisduplicate(false);
    const resavailable = await isHandleAvailable(handle2);

    if (resavailable) {
      try {
        const res = await logInUserFromGoogle();
        if (res.user !== null && res.user.uid !== null) {
          await registerHandle(handle2, res.user.uid);
        }
      } catch (e) {
        toggleisduplicate(true);
        setRegisterError2(returnErrorMessage(e.code));
      }
    } else {
      setRegisterError2(returnErrorMessage('reg/na'));
    }
  }


  useEffect(() => {
    async function checkHandle() {
      setIsSearching(true);
      setHasBeenChecked(false);
      setIsAvailable(false);

      if (validateHandle(handle) !== '') {
        setIsAvailable(false);
        setHasBeenChecked(true);
        setIsSearching(false);
      } else {
        const res = await isHandleAvailable(handle);
        setIsAvailable(res);
        setHasBeenChecked(true);
        setIsSearching(false);
      }
    }

    if (handle === '') {
      setIsAvailable(false);
      setHasBeenChecked(true);
      setIsSearching(false);
    } else {
      checkHandle();
    }
  }, [handle]);

  function generateTooltip() {
    if (handle === '') {
      return (
        <Text margin="20px 0 0 0" small centered>
          Check the availability of your Addrs and register it here.
        </Text>
      );
    }

    if (validateHandle(handle) !== '') {
      return (
        <Error margin="20px 0 0 0" small centered>
          {validateHandle(handle)}
        </Error>
      );
    }

    if (!hasBeenChecked) {
      return (
        <Text margin="20px 0 0 0" small centered>
          Checking availability...
        </Text>
      );
    }

    if (isAvailable) {
      return (
        <Valid margin="20px 0 0 0" small centered>
          This Addrs is available! You can register it right now.
        </Valid>
      );
    }

    return (
      <Error margin="20px 0 0 0" small centered>
        <NavLink to={`/${handle}`} color="#FF7F11">
          This Addrs is not available! Check the profile here.
        </NavLink>
      </Error>
    );
  }

  return (
    <>
      <RegisterModal
        toggle={() => toggleRegisterModal(!isRegisterModalOpen)}
        isOpen={isRegisterModalOpen}
        handle={handle}
        onRegister={(email: string, password: string) => registerUserAndRegisterHandle(email, password, handle, setRegisterError)}
        onGoogleSignIn={() => GoogleSignUp(handle, setRegisterError)}
        onMetamaskLogIn={() => MetaMaskLogin(handle, setRegisterError)}
        error={registerError}
      />
      <SearchForm
        handle={handle}
        isSearching={isSearching}
        isAvailable={isAvailable}
        hasBeenChecked={hasBeenChecked}
        onChange={(e: React.FormEvent<HTMLInputElement>) => setHandle(e.currentTarget.value.toLowerCase())}
        onRegisterClick={() => toggleRegisterModal(!isRegisterModalOpen)}
      />
      {generateTooltip()}
    </>
  );
}

export default SearchFormManager;
