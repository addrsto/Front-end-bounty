import React, {
  useState,
  useEffect,
} from 'react';
import {
  useParams,
} from 'react-router-dom';
import {
  Box,
} from 'reflexbox';

import {
  isHandleAvailable,
  isSubHandleAvailable,
  getUserAddresses,
} from '../../utils/handleManager';

import Coins from '../../assets/coins/coins.json';
import Address from '../../components/address';

import {
  Card,
  Title,
  Text,
  Row,
  Handle,
} from '../../style/components';

function Profile() {
  const {
    handle,
  }:any = useParams();

  const coins = Coins as CoinsInterface;
  const [addresses, setAddresses] = useState<UserAddressesInterface>();

  const [hasCheckedHandle, setHasCheckedHandle] = useState(false);
  const [handleExists, setHandleExists] = useState(false);

  const handleToCheck = handle || '';

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
      const res = await getUserAddresses(handleToCheck);
      setAddresses(res);
    }

    if (handleExists) {
      getAddresses();
    }
  }, [handleToCheck, handleExists]);

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

    return (
      <>
        <Row margin="auto">
          <Handle margin="0">
            {handle}
          </Handle>
          {addresses && Object.keys(addresses).length >= 1 ? (
            <>
              {Object.keys(addresses).map((coin) => (
                <Row
                  key={coin}
                  width="100%"
                >
                  <Address
                    key={coin}
                    logo={coins[coin].logo}
                    name={coin}
                    address={addresses[coin]}
                    withBackground
                    clickable
                  />
                </Row>
              ))}
            </>
          ) : (
            <Text margin="12px 0 0 0">
              It looks like this handle does not have any addresses...
            </Text>
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
    </>
  );
}

export default Profile;
