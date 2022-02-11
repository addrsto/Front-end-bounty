import React, {
  useState,
  useEffect,
} from 'react';
import WAV from 'multicoin-address-validator';
import {
  Box,
} from 'reflexbox';

import {
  Button,
  Text,
  Row,
  Modal,
  Dropdown,
  Input,
  Flex,
  Error,
  Valid,
} from '../../style/components';

import Coins from '../../assets/coins/coins.json';

interface AddAddressModalProps {
  onAddAddress: Function;
  toggle: Function;
  isOpen: boolean;
  isLoading: boolean;
}

function AddAddressModal(props: AddAddressModalProps) {
  const {
    onAddAddress,
    toggle,
    isOpen,
    isLoading,
  } = props;

  const coins = Coins as CoinsInterface;

  const [coin, setCoin] = useState('');
  const [address, setAddress] = useState('');
  const [isValid, setValid] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCoin('');
      setAddress('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (coin !== '') {
      if (coins[coin].ERC20) {
        setValid(WAV.validate(address, 'ETH'));
      } else {
        setValid(WAV.validate(address, coin));
      }
    }
  }, [coin, coins, address]);

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggle()}
      title="Add a new address"
    >
      <div>
        <Text noMargin small>
          Select a coin and enter the address you want to link to your handle.
        </Text>
      </div>
      <Flex padding="28px 0 14px 0">
        <Box width={2 / 3} px={1}>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            block
          />
        </Box>
        <Box width={1 / 3} px={1}>
          <Dropdown
            initialLabel="Coin"
            coins={Coins}
            onSelect={(e: string) => setCoin(e)}
            block
          />
        </Box>
      </Flex>
      <Row>
        {address !== '' && coin !== '' && (
          <>
            {isValid ? (
              <Valid small margin="0 0 12px 0">
                This address is valid!
              </Valid>
            ) : (
              <Error small margin="0 0 12px 0">
                This address is NOT valid!
              </Error>
            )}
          </>
        )}
      </Row>
      <Row>
        <Button
          genre="primary"
          onClick={() => onAddAddress(coin, address)}
          disabled={coin === '' || address === '' || !isValid}
          isWaiting={isLoading}
          block
        >
          Confirm
        </Button>
      </Row>
    </Modal>
  );
}

export default AddAddressModal;
