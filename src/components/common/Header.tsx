import { styled } from "styled-components";

import LogoSvg from "../../assets/svg/LogoSvg";

const Header = () => {
  return (
    <Wrapper>
      <Inner>
        <Logo>
          <a href="/">
            <LogoSvg />
          </a>
        </Logo>
        <Nav>
          <a href="/">소개</a>
          <a href="/">질문과 답변</a>
          <a href="/">소식받기</a>
          <a href="/">제휴/문의</a>
        </Nav>
      </Inner>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 56px;
  background-color: #fff;
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1040px;
  padding: 0 20px;
`;

const Logo = styled.h1`
  width: 126px;
  height: 100%;

  & > a {
    display: flex;
    align-items: center;
    height: 100%;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;

  & > a {
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.6;
    color: #1e2025;
    padding: 8px 16px;

    &:hover {
      text-decoration: underline;
    }
  }
`;
