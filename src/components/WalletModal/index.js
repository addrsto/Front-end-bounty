import React from 'react';
import { useWeb3React } from "@web3-react/core";
import className from "classnames";
import { useEffect, useState } from "react";
import useEagerConnect from "../hooks/useEagerConnect";
import { connectorsByName, SUPPORTED_WALLETS } from "../lib/connectors";
import { isMetaMask, getEtherscanLink } from "../lib/utils";
import { Modal, ModalHeader } from "../Modal";
import { useWalletModalOpen, useWalletModalToggle } from "./state";

const renderWalletName = (name) =>
  name === "INJECTED"
    ? isMetaMask
      ? SUPPORTED_WALLETS.METAMASK.name
      : SUPPORTED_WALLETS.INJECTED.name
    : SUPPORTED_WALLETS[name].name;

const renderWalletDescription = (name) =>
  name === "INJECTED"
    ? isMetaMask
      ? SUPPORTED_WALLETS.METAMASK.description
      : SUPPORTED_WALLETS.INJECTED.description
    : SUPPORTED_WALLETS[name].description;

const renderWalletIcon = (name) =>
  name === "INJECTED"
    ? isMetaMask
      ? SUPPORTED_WALLETS.METAMASK.icon
      : SUPPORTED_WALLETS.INJECTED.icon
    : SUPPORTED_WALLETS[name].icon;

const WalletModal = () => {
  const { connector, deactivate, error, activate, account } = useWeb3React();

  const isOpen = useWalletModalOpen();
  const onDismiss = useWalletModalToggle();

  const [activatingConnector, setActivatingConnector] = useState();

  /**
   * Handle reseting the active connector
   */
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector)
      setActivatingConnector(undefined);
  }, [activatingConnector, connector]);

  /**
   * Handle error alert and disconnecting from connector
   */
  useEffect(() => {
    if (!!error) {
      setActivatingConnector(undefined);

      deactivate();
    }
  }, [error]);

  const triedEager = useEagerConnect();

  const handleNetwork = e => {
    const network = e.target.value;
    if (network === 'mainnet') {
      window.location.href = 'https://conjure.finance/';
    } else if (network === 'polygon') {
      window.location.href = 'https://polygon.conjure.finance/';
    } else if (network === 'rinkeby') {
      window.location.href = 'https://rinkeby.conjure.finance/';
    }
  };

  if (account)
    return (
      <Modal
        isOpen={isOpen}
        onDismiss={onDismiss}
        className="bg-primary"
        ariaLabel="Wallet Modal"
        narrow
        dangerouslyBypassFocusLock={activatingConnector}
      >
        <ModalHeader title="My Account" onDismiss={onDismiss} />
        <div className="my-4 sm:my-8">
          <div className="flex flex-col items-center">

            <div className="mb-4">
              <a href={getEtherscanLink(137, account, "ADDRESS")}>
                <button className="btn">
                  <p>View on Etherscan</p>
                </button>
              </a>
            </div>
            <div className="mb-4">
              <button className="btn" onClick={deactivate}>
                <p>Sign Out</p>
              </button>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            img {
              height: 90px;
              width: 90px;
            }
            button {
            background-color: black;
            }
            button:hover {
              background-color: rgba(0, 255, 173, 0.25);
            }
            button > p {
              color: white;
              opacity: 1;

            }
          .bg-primary {
             background-color: teal !important;
             opacity: 90%;
          }
          
                  .modal__container--main {
          margin-top: 100px;
          position: fixed;
          height: 320px;
          width: 400px;
          background: linear-gradient(To left bottom, #5ffde3 10%, #01e5ff);
          border-radius: 20px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          flex-direction: column;
        }


        .modal__container--secondary {
          height: 260px;
          width: 400px;
          padding: 20px;
          border-radius: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: column;
        }

        .modal__container--secondary-card {
          height: 100px;
          width: 360px;
          background: rgba(194, 187, 187, 0.466);
          border: 2px solid rgba(194, 187, 187, 0.466);
          border-radius: 20px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-family: 'Montserrat';
          font-size: 1.0rem;
          color: black;
          font-weight: 600;
        }

        .modal__container--secondary-card:hover {
          cursor: pointer;
          border: 2px solid #fff;
        }

        .modal__container--secondary-card--metamask {
          background: ("metamask-icon.svg");
          background-size: cover;
          height: 60px;

          width: 70px;
          margin-left: 10px;
        }

        .modal__container--secondary-card--walletconnect {
          background: ("walletconnect-icon.svg");
          background-size: cover;
          height: 40px;
          width: 65px;
          margin-left: 10px;
        }

        .modal__container--secondary-card p {
          margin-left: 20px;
        }

        .modal__select {
          border: none;
          margin-bottom: 16px;
          margin-top: 16px;
          font-size: 16px;
          font-weight: 500;
          font-family: 'Montserrat';
          color: black;
          text: center;
          background: none;
        }


        @media screen and (max-width: 889px) {
          .modal__container--secondary-card {
            height: 100px;
            width: 90%;
            background: rgba(194, 187, 187, 0.466);
            border: 2px solid rgba(194, 187, 187, 0.466);
            border-radius: 20px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-family: 'Montserrat';
            font-size: 1.0rem;
            color: black;
            font-weight: 600;
          }

          .modal__container--secondary {
            height: 260px;
            width: 90%;
            padding: 20px;
            border-radius: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
          }
        }


        .modal__select:focus,
        .modal__select select:focus {
          outline: none;
        }
          `}
        </style>
      </Modal>
    );

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={onDismiss}
      className="bg-primary"
      ariaLabel="Wallet Modal"
      narrow
      dangerouslyBypassFocusLock={activatingConnector}
    >

      <div className="my-4 sm:my-8">

        <div className='modal__container--secondary'>
          {Object.keys(connectorsByName).map((name, i) => {
            const currentConnector = connectorsByName[name];
            const activating = currentConnector === activatingConnector;
            const connected = currentConnector === connector;
            const disabled =
              !triedEager || !!activatingConnector || connected || !!error;

            const handleConnect = async () => {
              setActivatingConnector(currentConnector);

              await activate(connectorsByName[name]);

              onDismiss();
            };

            return (
                <div
                    className='modal__container--secondary-card'
                    onClick={() => handleConnect(name)}
                >
                  <div className='modal__container--secondary-card--metamask'>
                    <img src={renderWalletIcon(name)} alt={"wallet icon"} />
                  </div>
                  {name === "INJECTED" ?
                      <p>Connect with Metamask</p>
                  :
                      <p>Connect with WalletConnect</p>
                  }
                </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .wallet-option:not(:last-child) {
          margin-bottom: var(--spacing-small);
        }

        @media screen and (min-width: 30em) {
          .wallet-option:not(:last-child) {
            margin-bottom: var(--spacing-medium);
          }
        }

        .wallet-option-button {
          overflow: hidden;
          outline: none;
          border-radius: var(--radius);
          border: 1px solid white;
          transition: all 0.2s ease 0s;
          display: inline-flex;
          color: var(--offwhite);
          width: 50%;
          text-decoration: none;
          padding: 16px;
          height: 200px;
          margin: 0px;
          background: teal !important;
        }

        .bg-primary {
          background: linear-gradient(To left bottom, #5ffde3 10%, #01e5ff);
          opacity: 90%;
        }

        .wallet-option-button:hover {
          color: rgba(0, 255, 173, 1);
        }

        .wallet-option-button:hover {
          color: rgba(0, 255, 173, 1);
        }

        .wallet-option-button:hover,
        .wallet-option-button:focus {
          border-color: var(--offwhite);
        }

        .wallet-option-button:disabled,
        .wallet-option-button:disabled:hover {
          cursor: not-allowed;
          color: var(--dark-grey);
          border-color: var(--grey);
        }

        .wallet-option-button .description {
          color: var(--offwhite);
        }

        img {
          height: 65px;
          width: 65px;
        }

        .wallet-option-button-icon {
          position: relative;
          top: 40px;
        }

        .modal__container--main {
          margin-top: 100px;
          position: fixed;
          height: 320px;
          width: 400px;
          background: linear-gradient(To left bottom, #5ffde3 10%, #01e5ff);
          border-radius: 20px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          flex-direction: column;
        }


        .modal__container--secondary {
          height: 260px;
          width: 350px;
          padding: 20px;
          border-radius: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: column;
          z-index: 100000;
        }

        .modal__container--secondary-card {
          height: 100px;
          width: 360px;
          background: rgba(194, 187, 187, 0.466);
          border: 2px solid rgba(194, 187, 187, 0.466);
          border-radius: 20px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-family: 'Montserrat';
          font-size: 1.0rem;
          color: black;
          font-weight: 600;
        }

        .modal__container--secondary-card:hover {
          cursor: pointer;
          border: 2px solid #fff;
        }

        .modal__container--secondary-card--metamask {
          background: ("metamask-icon.svg");
          background-size: cover;
          height: 60px;

          width: 70px;
          margin-left: 10px;
        }

        .modal__container--secondary-card--walletconnect {
          background: ("walletconnect-icon.svg");
          background-size: cover;
          height: 40px;
          width: 65px;
          margin-left: 10px;
        }

        .modal__container--secondary-card p {
          margin-left: 20px;
        }

        .modal__select {
          border: none;
          margin-bottom: 16px;
          margin-top: 16px;
          font-size: 16px;
          font-weight: 500;
          font-family: 'Montserrat';
          color: black;
          text: center;
          background: none;
        }


        @media screen and (max-width: 889px) {
          .modal__container--secondary-card {
            height: 100px;
            width: 90%;
            background: rgba(194, 187, 187, 0.466);
            border: 2px solid rgba(194, 187, 187, 0.466);
            border-radius: 20px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-family: 'Montserrat';
            font-size: 1.0rem;
            color: black;
            font-weight: 600;
          }

          .modal__container--secondary {
            height: 260px;
            width: 90%;
            padding: 20px;
            border-radius: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
          }
        }


        .modal__select:focus,
        .modal__select select:focus {
          outline: none;
        }
      `}</style>
    </Modal>
  );
};

export default WalletModal;
