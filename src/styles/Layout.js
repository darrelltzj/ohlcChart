import styled from 'styled-components';

export const Loader = styled.div`
height: 100vh;
width: 100vw;
z-index: 1000;
position: absolute;
top: 0;
left: 0;
background-color: rgba(0,0,0,.7);
color: white;
display: flex;
justify-content: center;
align-items: center;
`;

export const ErrContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

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
  height: 65vh;
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
  height: 35vh;
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
@media (max-height: 375px) {
  & > h1 {
    display: none;
  }
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
text-decoration: none;
& > a {
  color: #ccc;
  text-decoration: none;
}
@media (max-width: 576px) {
  display: none;
}
@media (max-height: 375px) {
  display: none;
}
`;
