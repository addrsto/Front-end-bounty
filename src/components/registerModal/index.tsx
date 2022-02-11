import React, {
  useState,
  useEffect,
} from 'react';
import styled from 'styled-components';

import {Divider} from '@material-ui/core'

import {
  Input,
  Button,
  Modal,
  Label,
  Text,
  Row,
  Error,
} from '../../style/components';

import GoogleSignin from '../../assets/img/btn_google_signin_light_normal_web@2x.png';
import MetamaskIcon from "../../assets/img/metamask.png";

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
  onMetamaskLogIn: Function;
  handle: string;
  toggle: Function;
  error: string;
}

function RegisterModal(props: RegisterModalProps) {
  const {
    toggle,
    onRegister,
    onGoogleSignIn,
    onMetamaskLogIn,
    isOpen,
    handle,
    error,
  } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      title="Register"
      toggle={() => toggle()}
    >
      <Row padding="0 0 28px 0">
        <Text noMargin small>
          Create an account to register the handle
          {' '}
          <b>{handle}</b>
          .
        </Text>
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
            onClick={() => onRegister(email, password)}
            disabled={email === '' || password === ''}
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
            onClick={() => onGoogleSignIn()}
            block
        >
          <img height="60px" alt="Google SignIn Button" src={GoogleSignin} />
        </Button>
      </Row>
      <Divider orientation="horizontal" />
      <Row padding="10px 0 0 0">
        <Button
            genre="link"
            onClick={() => onMetamaskLogIn()}
            block
        >
          <img height="60px" alt="Google SignIn Button" src={MetamaskIcon} />
        </Button>
      </Row>
    </Modal>
  );
}

export default RegisterModal;
