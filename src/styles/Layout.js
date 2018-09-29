import styled from 'styled-components';

export const MainRow = styled.main`
width: 100%;
display: flex;
flex-direction: row;
@media (max-width: 576px) {
  flex-direction: column;
  justify-content: space-between;
}
`;

export const Sider = styled.aside`
width: 240px;
height: 100vh;
background-color: #222;
color: #fff;
overflow-x: hidden;
overflow-y: scroll;
@media (max-width: 576px) {
  width: 100%;
  height: 70vh;
  @media (max-height: 360px) {
    height: 25vh;
    display: flex;
    overflow-x: scroll;
  }
}
`;

export const MainCol = styled.main`
width: 100%;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: space-between;
@media (max-width: 576px) {
  height: 30vh;
  @media (max-height: 360px) {
    height: 75vh;
  }
}
`;

export const Header = styled.header`
padding: 10px 50px;
@media (max-width: 576px) {
  display: none;
}
`;

export const Content = styled.section`
padding: 10px 50px;
@media (max-width: 576px) {
  padding: 10px;
}
`;

export const Footer = styled.footer`
padding: 10px;
text-align: center;
color: #ccc;
@media (max-width: 576px) {
  display: none;
}
`;

// & > h1 {
//   display: none;
// }
// @media (max-width: 1600px) {}
// @media (max-width: 1200px) {}
// @media (max-width: 992px) {}
// @media (max-width: 768px) {}
// @media (max-width: 576px) {}
