import React, {
  useState,
  useEffect,
} from 'react';
import styled from 'styled-components';

import GoogleSignin from '../../assets/img/btn_google_signin_light_normal_web@2x.png';

import {
  Input,
  Button,
  Modal,
  Label,
  Text,
  Row,
  Error,
} from '../../style/components';
import MetamaskIcon from "../../assets/img/metamask.png";

import {Divider} from '@material-ui/core'

const PasswordInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ShowButton = styled(Button)`
  margin-left: -96px;
  padding-right: 10px;
`;

interface RegisterModalProps {
    isOpen: boolean;
    onRegister: Function;
    onGoogleSignIn: Function;
    onMetamaskRegister: Function;
    toggle: Function;
    error: string;
}

function validateHandle(handle: string) {
  if (handle.toLowerCase().match(/^[a-z0-9-_]+$/) === null) {
    return 'Addrs is not valid. Addrs can only contain letters, numbers and \'-\' or \'_\'.';
  }

  if (handle.toLowerCase().length < 3) {
    return 'Addrs is too short! Addrs must contain at least 3 characters.';
  }

  if (handle.toLowerCase().length > 100) {
    return 'Addrs is too long! Addrs must contain less than 100 characters';
  }

  return '';
}

function RegisterModalFull(props: RegisterModalProps) {
  const {
    toggle,
    onRegister,
    onGoogleSignIn,
    onMetamaskRegister,
    isOpen,
    error,
  } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [handle, setHandle] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setHandle('');
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      title="Register"
      toggle={() => toggle()}
    >
      <Row padding="0 0 16px 0">
        <Text noMargin small>
          Create an account to register the Addrs
          {' '}
          <b>{handle.toLowerCase()}</b>
          .
        </Text>
        {validateHandle(handle)}
      </Row>
      <Row padding="0 0 28px 0">
        <Label>
          Handle
        </Label>
        <Input
            placeholder="satoshi"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            block
        />
      </Row>
      <Row padding="0 0 16px 0">
        <p>
          Choose Sign In Method
        </p>
      </Row>
      <Row padding="0 0 16px 0">
        <Label>
          Email address
        </Label>
        <Input
          placeholder="satoshi@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          block
        />
      </Row>
      <Row padding="0 0 28px 0">
        <Label>
          Password
        </Label>
        <PasswordInputWrapper>
          <Input
            type="password"
            placeholder="6 characters or +"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            block
          />
          <ShowButton
            genre="link"
          >
            Show
          </ShowButton>
        </PasswordInputWrapper>
      </Row>
      <Row padding="10px 0 10px 0">
        <Button
            genre="primary"
            onClick={() => onRegister(email, password, handle)}
            disabled={email === '' || password === '' || handle === '' || (handle !== '' && validateHandle(handle) !== '')}
            block
        >
          Register
        </Button>
        {error.length > 0 && (
            <Error small>
              {error}
            </Error>
        )}
      </Row>
      <Divider orientation="horizontal" />
      <Row padding="10px 0 0 0">
        <Button
            genre="link"
            onClick={() => onGoogleSignIn(handle)}
            disabled={handle === '' || (handle !== '' && validateHandle(handle) !== '')}
            block
        >
          <img height="60px" alt="Google SignIn Button" src={GoogleSignin} />
        </Button>
      </Row>
      <Divider orientation="horizontal" />
      <Row padding="10px 0 0 0">
        <Button
            genre="link"
            onClick={() => onMetamaskRegister(handle)}
            disabled={handle === '' || (handle !== '' && validateHandle(handle) !== '')}
            block
        >
          <img height="60px" alt="Google SignIn Button" src={MetamaskIcon} />
        </Button>
      </Row>
    </Modal>
  );
}

export default RegisterModalFull;
