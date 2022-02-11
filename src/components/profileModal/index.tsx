import React, {
  useEffect,
  useState
} from 'react';

import {
  Input,
  Modal,
  Label,
  Row, Button,
} from '../../style/components';
import {getUserAddresses} from "../../utils/handleManager";

import QRCode from "react-qr-code";
import ReactDOM from "react-dom";

interface ProfileModalProps {
    isOpen: boolean;
    toggle: Function;
    handle: string;
    api_key: string;
    bio: string;
    avatar: string;
    background: string;
  updateProfile: Function;
  uid: string,
}



function ProfileModal(props: ProfileModalProps) {
  const {
    toggle,
    isOpen,
    handle,
    api_key,
      bio,
      avatar,
      background,
      updateProfile,
      uid
  } = props;

  let [newbackground, setNewBackground] = useState(background)
  let [newavatar, setnewavatar] = useState(avatar)
  let [newbio, setnewbio] = useState(bio)

  useEffect(() => {

    setNewBackground(background)
    setnewbio(bio)
    setnewavatar(avatar)
  }, [background,avatar,bio]);

  async function handleUpdate() {
    await updateProfile(uid,newbio,newavatar,newbackground)

    toggle()
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Profile"
      toggle={() => toggle()}
    >
      <Row padding="0 0 16px 0">
        <Label>
          Handle
        </Label>
        <Input
          value={handle}
          block
        />
      </Row>
      <Row>
        <Label>
          Your Handle QR Code
        </Label>
        <QRCode value={"https://addrs.to/" + handle} size={100}/>
      </Row>
      <Row padding="0 0 16px 0">
        <Label>
          API Key
        </Label>
        <Input
          value={api_key}
          block
        />
      </Row>
      <Row padding="0 0 16px 0">
        <Label>
          Bio
        </Label>
        <Input
            value={newbio}
            onChange={(e) => setnewbio(e.target.value)}
            block
        />
      </Row>
      <Row padding="0 0 16px 0">
        <Label>
          Avatar
        </Label>
        <Input
            value={newavatar}
            onChange={(e) => setnewavatar(e.target.value)}
            block
        />
      </Row>
      <Row padding="0 0 16px 0">
        <Label>
          Background
        </Label>
        <Input
            value={newbackground}
            onChange={(e) => setNewBackground(e.target.value)}
            block
        />
      </Row>
      <Row>
        <Button
            genre="primary"
            onClick={handleUpdate}
        >
          Update Your Profile
        </Button>
      </Row>
    </Modal>
  );
}

export default ProfileModal;
