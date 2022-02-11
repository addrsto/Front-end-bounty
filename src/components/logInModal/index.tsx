import React, {
  useState,
  useEffect,
} from 'react';

import {Divider} from '@material-ui/core'

import GoogleSignin from '../../assets/img/btn_google_signin_light_normal_web@2x.png';
import MetamaskIcon from '../../assets/img/metamask.png';

import {
  Input,
  Button,
  Modal,
  Label,
  Row,
  Error,
} from '../../style/components';

interface LogInModalProps {
  isOpen: boolean;
  onLogIn: Function;
  onGoogleSignIn: Function;
  onMetamaskLogIn: Function;
  toggle: Function;
  error: string;
  toggleLostPassword: Function;
}

function LogInModal(props: LogInModalProps) {
  const {
    toggle,
    onLogIn,
    onGoogleSignIn,
    onMetamaskLogIn,
    isOpen,
    error,
    toggleLostPassword,
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
      title="Log In"
      toggle={() => toggle()}
    >
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
      <Row padding="0 0 18px 0">
        <Label>
          Password
        </Label>
        <Input
          type="password"
          placeholder="6 characters or +"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          block
        />
      </Row>
      <Row padding="10px 0 10px 0">
        <Button
            genre="primary"
            onClick={() => onLogIn(email, password)}
            disabled={email === '' || password === ''}
            block
        >
          Log In
        </Button>
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
      <Divider orientation="horizontal" />
      <Row>
        {error.length > 0 && (
          <Error small margin="0">
            {error}
          </Error>
        )}
      </Row>
      <Row>
        <Button genre="danger" onClick={() => toggleLostPassword()}>
          Lost Password?
        </Button>
      </Row>
    </Modal>
  );
}

export default LogInModal;
