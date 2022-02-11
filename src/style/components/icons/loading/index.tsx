import styled, {
  keyframes,
} from 'styled-components';

import { ReactComponent as LoadingSvg } from '../../../../assets/img/sm-refresh.svg';

interface LoadingInterface {
  white?: boolean;
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(-360deg);
  }
`;

const Loading = styled(LoadingSvg)<LoadingInterface>`
  animation: ${rotate} infinite 2s linear;

  vertical-align: middle;
  height: 16px;

  path {
    fill: ${(props) => (props.white ? '#ffffff' : props.theme.colors.primary)};
  }
`;

export default Loading;
