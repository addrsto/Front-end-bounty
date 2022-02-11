import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {
  Box,
} from 'reflexbox';

import {
  Title,
  Row,
  Text,
  Button,
  Subtitle,
  Card,
  Handle,
  ButtonText,
  Error,
} from '../../style/components';

import Address from '../address';
import AddAddressModal from '../addAddressModal';
import RemoveAddressModal from '../removeAddressModal';

import {
  getUserAddresses,
  getUserHandle,
  updateAddress,
  removeAddress,
  sendEmailVerification,
    getUserBackground,
    getUserBio,
    getUserAvatar,
    updateProfile
} from '../../utils/handleManager';

import Coins from '../../assets/coins/coins.json';

import PlusIcon from '../../style/components/icons/plus/index';
import DuplicateContext from '../context/DuplicateContext';
import ProfileModal from '../profileModal';

function displayAddresses(
  data: UserAddressesInterface,
  setCoinToRemove: Function,
  toggleRemoveAddressModal: Function,
  handle: string,
) {
  const coins = Coins as CoinsInterface;

  const list = [];

  for (let i = 0; i < Object.keys(data).length; i += 1) {
    const coin = Object.keys(data)[i];

    list.push(
      <Address
        key={coin}
        logo={coins[coin].logo}
        name={coin}
        address={`${data[coin].slice(0, 5)}...${data[coin].slice(data[coin].length - 6, data[coin].length)}`}
        onRemove={() => {
          setCoinToRemove(coin);
          toggleRemoveAddressModal();
        }}
        canCopy
        handle={handle}
      />,
    );
  }

  return list;
}

function Dashboard() {
  const [addresses, setAddresses] = useState<UserAddressesInterface>({});
  const [handle, setHandle] = useState('');

  const [isAddAddressModalOpen, toggleAddAddressModal] = useState(false);
  const [isProfileModalOpen, toggleProfileModal] = useState(false);
  const [isRemoveAddressModalOpen, toggleRemoveAddressModal] = useState(false);
  const [coinToRemove, setCoinToRemove] = useState('');

  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [verificationEmailSent, setVerificationEmailSent] = useState(false);

  const [isLoading, toggleLoading] = useState(false);
  // const isduplicate = useContext(DuplicateContext);
  // @ts-ignore
  const [isduplicate, toggleisduplicate] = useContext(DuplicateContext);

  const [usertoken, setusertoken] = useState('');
  const [user, setUser] = useState<firebase.User>();
  const [bio, setBio] = useState("")
    const [avatar, setavatar] = useState("")
    const [background, setbackground] = useState("")


  useEffect(() => {
    async function gettoken() {
      const token = await firebase.auth().currentUser?.getIdToken(false);

      let statetoken = '';
      if (token !== null && token !== undefined) {
        statetoken = token;
        setusertoken(statetoken);
      }
    }

    const { currentUser } = firebase.auth();

    if (currentUser) {
      setUser(currentUser);
      gettoken();
    }
  }, []);

  // firebase delay in showing handle
  const delay = async (ms: number) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    async function getHandle(uid: string) {
      await delay(1000);
      const res = await getUserHandle(uid);
      setHandle(res);

      const resbio = await getUserBio(uid);
      setBio(resbio)

        const resavatar = await getUserAvatar(uid);
        setavatar(resavatar)

        const resback = await getUserBackground(uid);
        setbackground(resback)
    }



    if (user) {
      setIsEmailVerified(true);
      getHandle(user.uid);
    }
  }, [user, isProfileModalOpen]);

  useEffect(() => {
    async function getAddresses() {
      const res = await getUserAddresses(handle);

      if (res) {
        setAddresses(res);
      }
    }

    if (handle !== '') {
      getAddresses();
    }
  }, [handle]);

  return (
    <>
      <ProfileModal
        isOpen={isProfileModalOpen}
        toggle={() => toggleProfileModal(!isProfileModalOpen)}
        handle={handle}
        api_key={usertoken}
        background={background}
        avatar={avatar}
        bio={bio}
        updateProfile={updateProfile}
        uid={user && user.uid}
      />
      <AddAddressModal
        isOpen={isAddAddressModalOpen}
        toggle={() => toggleAddAddressModal(!isAddAddressModalOpen)}
        onAddAddress={async (coin: string, address: string) => {
          toggleLoading(true);
          await updateAddress(handle, coin, address);
          toggleLoading(false);
          toggleAddAddressModal(!isAddAddressModalOpen);

          const res = await getUserAddresses(handle);

          if (res) {
            setAddresses(res);
          }
        }}
        isLoading={isLoading}
      />
      <RemoveAddressModal
        isOpen={isRemoveAddressModalOpen}
        toggle={() => toggleRemoveAddressModal(!isRemoveAddressModalOpen)}
        onRemoveAddress={async () => {
          toggleLoading(true);
          await removeAddress(handle, coinToRemove);
          toggleLoading(false);
          toggleRemoveAddressModal(!isRemoveAddressModalOpen);

          const res = await getUserAddresses(handle);

          if (res) {
            setAddresses(res);
          }
        }}
        isLoading={isLoading}
      />
      <Row>
        <Title margin="0.67em 0 0 0">
          Welcome!
        </Title>
        <Handle margin="0.1em 0 0 0">
          {handle}
        </Handle>
      </Row>
      {isduplicate ? (
        <Box width={[1, 1 / 2]} padding="20px 20px 0px 20px" margin="auto">
          <Error centered>
            Sorry, you can only register one handle with your account.
          </Error>
        </Box>
      ) : (<> </>
      )}

      <Box width={[1, 1 / 2]} padding="20px 20px 0px 20px" margin="auto">
        <Text small centered>
          This is your dashboard, use it to add or remove the addresses linked to your handle.
        </Text>
      </Box>
      <Row padding="1.5em 0 1.5em 0" maxWidth="30rem" margin="auto">
        {Object.keys(addresses).length === 0 ? (
          <>
            <Subtitle margin="0.67em 0 0 0">
              No linked addresses!
            </Subtitle>
            <Text margin="0.1em 0 0.67em 0" small>
              You can add new addresses to receive funds.
            </Text>
          </>
        ) : (
          <Card>
            {displayAddresses(
              addresses,
              setCoinToRemove,
              () => toggleRemoveAddressModal(!isAddAddressModalOpen),
              handle,
            )}
          </Card>
        )}
      </Row>
      <Row padding="16px 0 20px 0">
        <Button
          onClick={() => toggleAddAddressModal(!isAddAddressModalOpen)}
          genre="primary"
        >
          <PlusIcon white />
          <ButtonText>
            Add a new address
          </ButtonText>
        </Button>
      </Row>
      <Row>
        <Button
          genre="primary"
          onClick={() => toggleProfileModal(!isProfileModalOpen)}
        >
          Your Profile
        </Button>
      </Row>
      {!isEmailVerified && (
        <Box width={[1, 1 / 2]} padding="20px 20px 0px 20px" margin="auto" textAlign="center">
          <Error margin="0">
            Your email is not verified!
          </Error>
          <>
            {verificationEmailSent ? (
              <Text margin="0">
                Email verification was sent, please check your inbox!
              </Text>
            ) : (
              <Button
                genre="danger"
                onClick={async () => {
                  if (user) {
                    try {
                      await sendEmailVerification(user);
                      setVerificationEmailSent(true);
                    } catch (e) {
                      console.log(e);
                    }
                  }
                }}
              >
                Send verification email
              </Button>
            )}
          </>
        </Box>
      )}
      <Row>
        <Button
          genre="danger"
          onClick={() => firebase.auth().signOut()}
        >
          Log Out
        </Button>
      </Row>
      <Row>

        <Text
          hidden
        >
          {usertoken}
        </Text>
      </Row>
    </>
  );
}

export default Dashboard;
