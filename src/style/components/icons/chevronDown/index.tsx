import styled from 'styled-components';

import { ReactComponent as PlusSvg } from '../../../../assets/img/sm-cheveron-down.svg';

interface ChevronDownInterface {
  white?: boolean;
}

const ChevronDown = styled(PlusSvg)<ChevronDownInterface>`
  vertical-align: middle;
  height: 16px;

  path {
    fill: ${(props) => (props.white ? '#ffffff' : props.theme.colors.primary)};
  }
`;

export default ChevronDown;
