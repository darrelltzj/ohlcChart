import styled from 'styled-components';

export default styled.input`
margin: 10px 0;
height: 30px;
background: #fff;
border: 2px solid #ccc;
-webkit-border-radius: 4px;
border-radius: 4px;
font-size: 14px;
:focus {
  outline: none;
  border: 2px solid green;
}
@media (max-width: 576px) {
  width: 100%;
  @media (max-height: 360px) {
    width: auto;
    height: 20px;
  }
}
`;
