import styled from 'styled-components';

const selectedBorder = '1px solid  #fff';

export const SiderMain = styled.nav`
padding: 10px;
position: sticky;
position: -webkit-sticky;
background: #222;
top: 0;
`;

export const SiderCard = styled.div`
height: 40px;
padding: 10px;
color: ${props => (props.selected ? '#fff' : '#aaa')};
border: ${props => (props.selected ? selectedBorder : 'none')};
cursor: pointer;
:hover {
  color: #fff;
}
`;
