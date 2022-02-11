import React, {
  useState,
  useEffect,
} from 'react';

import {
  Input,
  Button,
  Modal,
  Label,
  Row,
  Text,
} from '../../style/components';

interface LostPasswordModalProps {
  isOpen: boolean;
  onPasswordReset: Function;
  toggle: Function;
}

function LostPasswordModal(props: LostPasswordModalProps) {
  const {
    toggle,
    onPasswordReset,
    isOpen,
  } = props;

  const [email, setEmail] = useState('');
  const [emailWasSent, setEmailWasSent] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setEmailWasSent(false);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      title="Lost Password"
      toggle={() => toggle()}
    >
      <Row padding="0 0 16px 0">
        {emailWasSent ? (
          <>
            <Text>
              {`An email was sent to ${email}. Please check your inbox!`}
            </Text>
          </>
        ) : (
          <>
            <Text small>
              Please input your email address to reset your address.
            </Text>
            <Label>
              Email address
            </Label>
            <Input
              placeholder="satoshi@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              block
            />
          </>
        )}
      </Row>
      <Row padding="10px 0 0 0">
        <Button
          genre="primary"
          onClick={() => {
            setEmailWasSent(true);
            onPasswordReset(email);
          }}
          disabled={email === '' || emailWasSent}
          block
        >
          Reset password
        </Button>
      </Row>
    </Modal>
  );
}

export default LostPasswordModal;
