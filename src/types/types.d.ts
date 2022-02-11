interface StateInterface {
  username: string;
}

interface FirebaseContextInterface extends StateInterface {
  dispatch: React.Dispatch<any>;
}

interface ActionInterface {
  type: string;
  target: string;
  value: number | string | Function,
}

interface CoinsInterface {
  [key: string]: {
    enabled: boolean;
    logo: string;
    ticker: string;
    name: string;
    uri: string;
    ERC20: boolean;
  }
}

interface UserAddressesInterface {
  [key: string]: string;
}

interface AddressInterface {
  [key: string]: string;
}

interface AddressesInterface {
  [key: string]: {
    [key: string]: string;
  }
}

declare module '*.ttf';

declare module '*.json';
