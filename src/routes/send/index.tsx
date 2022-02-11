import React, {
  useState,
  useEffect,
} from 'react';
import {
  useParams,
} from 'react-router-dom';
import styled from 'styled-components';
import {
  Box,
} from 'reflexbox';

import {
  isHandleAvailable,
  isSubHandleAvailable,
  getUserAddresses,
} from '../../utils/handleManager';

import Coins from '../../assets/coins/coins.json';

import {
  Card,
  Title,
  Text,
  NavLink,
  Row,
  Link,
  Button,
  ButtonText,
  Handle,
  Icon,
} from '../../style/components';

const AddressWrapper = styled(Text)`
  padding: 10px;
  border-color: #f7f7fa;
  border-width: 1px;
  border-style: solid;
  border-radius: 20px;
  opacity: 0.5;
  background-color: #f7f7fa;
`;

function Send() {
  const {
    handle,
    coin,
  }:any = useParams();

  const coins = Coins as CoinsInterface;

  const [hasCheckedHandle, setHasCheckedHandle] = useState(false);
  const [handleExists, setHandleExists] = useState(false);
  const [uri, setUri] = useState('');
  const [address, setAddress] = useState('');

  const handleToCheck = handle || '';
  const coinToCheck = coin || '';

  useEffect(() => {
    async function checkHandle() {
      const res = await isHandleAvailable(handleToCheck);
      const res_sub = await isSubHandleAvailable(handleToCheck);

      if (res) {
        if (!res_sub) {
          setHandleExists(true);
        } else {
          setHandleExists(false);
        }
      } else {
        setHandleExists(!res);
      }
      setHasCheckedHandle(true);
    }

    if (handleToCheck && handleToCheck !== '') {
      checkHandle();
    }
  }, [handleToCheck]);

  useEffect(() => {
    async function getAddresses() {
      const addresses = await getUserAddresses(handleToCheck);
      const rawUri = coins[coinToCheck.toUpperCase()].uri;

      if (addresses[coinToCheck.toUpperCase()]) {
        setAddress(addresses[coinToCheck.toUpperCase()]);
        const formattedUri = rawUri.replace('{address}', addresses[coinToCheck.toUpperCase()]);
        setUri(formattedUri);

        window.location.replace(formattedUri);
      }
    }

    if (handleExists && coinToCheck) {
      getAddresses();
    }
  }, [handleToCheck, coins, handleExists, coinToCheck]);

  function returnContent() {
    if (!hasCheckedHandle) {
      return (
        <>
          <Row margin="auto">
            <Title>
              Checking handle...
            </Title>
            <Text>
              Grabbing all the information from our database...
            </Text>
          </Row>
        </>
      );
    }

    if (!handleExists) {
      return (
        <>
          <Row margin="auto">
            <Title>
              Hey-o!
            </Title>
            <Text>
              It looks like this handle does not exist...
            </Text>
          </Row>
        </>
      );
    }

    if (!coins[coinToCheck.toUpperCase()] || !coins[coinToCheck.toUpperCase()].enabled) {
      return (
        <>
          <Row margin="auto">
            <Title>
              Hey-o!
            </Title>
            <Text>
              It looks like <b>{coinToCheck.toUpperCase()}</b> is currently not supported.
            </Text>
          </Row>
        </>
      );
    }

    if (address === '') {
      return (
        <>
          <Row margin="auto">
            <Title>
              Hey-o!
            </Title>
            <Text>
              {`It looks like ${handle} does not have a ${coinToCheck.toUpperCase()} address...`}
            </Text>
            <NavLink to={`/${handle}`}>
              Visit profile
            </NavLink>
          </Row>
        </>
      );
    }

    return (
      <>
        <Row margin="auto">
          <Icon
            width="48px"
            src={coins[coinToCheck.toUpperCase()].logo}
            alt={coinToCheck.toUpperCase()}
          />
          <Title margin="10px 0">
            {`Sending ${coinToCheck.toUpperCase()}`}
          </Title>
          <Text margin="0 0 20px 0" small>
            You are about to send <b>{coins[coinToCheck.toUpperCase()].name}</b> to <b>{handle}</b>.
          </Text>
          <Handle margin="0">
            {handle}
          </Handle>
          <AddressWrapper margin="0 0 0.67em 0" small>
            {address}
          </AddressWrapper>
          {uri !== '' && (
            <>
              <Link
                href={uri}
                target="_blank"
                rel="noreferrer noopener"
                margin="0.67em"
              >
                Not redirected? Click here
              </Link>
            </>
          )}
          { ['BTC', 'ETH', 'USDC', 'DAI','YFI','LINK','UNI','USDT','AAVE','COMP','WBTC'].some((x) => x === coins[coinToCheck.toUpperCase()].ticker) && (
          <>
            <a href={`https://pay.sendwyre.com/purchase?destCurrency=${coins[coinToCheck.toUpperCase()].ticker}&dest=${address}&accountId=AC_DW6V9VLY6EJ`} target="_blank" rel="noopener noreferrer">
              <Button genre="primary">
                <ButtonText>
                  Pay using Visa with Wyre
                </ButtonText>
              </Button>
            </a>
          </>
          )}
        </Row>
      </>
    );
  }

  return (
    <>
      <Box width="100%" padding="32px" margin="auto">
        <Card width="100%" margin="auto">
          {returnContent()}
        </Card>
      </Box>
      <Row width="50%" margin="auto">
        <NavLink to={`/${handle}`}>
          Visit profile
        </NavLink>
      </Row>
    </>
  );
}

export default Send;
