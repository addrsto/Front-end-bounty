import React from 'react';

import {
  Button,
  Text,
  Row,
  Modal,
} from '../../style/components';

interface RemoveAddressModalProps {
  onRemoveAddress: Function;
  toggle: Function;
  isOpen: boolean;
  isLoading: boolean;
}

function RemoveAddressModal(props: RemoveAddressModalProps) {
  const {
    onRemoveAddress,
    toggle,
    isOpen,
    isLoading,
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggle()}
      title="Remove address"
    >
      <Text margin="0 0 18px 0" small>
        Do you really want to remove this address?
      </Text>
      <Row>
        <Button
          genre="primary"
          onClick={() => onRemoveAddress()}
          isWaiting={isLoading}
          block
        >
          Confirm
        </Button>
      </Row>
    </Modal>
  );
}

export default RemoveAddressModal;
