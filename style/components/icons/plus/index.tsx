import styled from 'styled-components';

import { ReactComponent as PlusSvg } from '../../../../assets/img/sm-plus.svg';

interface PlusInterface {
  white?: boolean;
}

const Plus = styled(PlusSvg)<PlusInterface>`
  vertical-align: middle;
  height: 16px;

  path {
    fill: ${(props) => (props.white ? '#ffffff' : props.theme.colors.primary)};
  }
`;

export default Plus;
