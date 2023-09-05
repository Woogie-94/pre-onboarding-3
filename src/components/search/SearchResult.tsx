import { styled } from "styled-components";

import SearchSvg from "../../assets/svg/SearchSvg";
import { Sick } from "../../services/search";

interface Props {
  result: Sick[];
}
const SearchResult = ({ result }: Props) => {
  return (
    <Wrapper>
      <Container>
        <ItemList>
          {result.map(sick => (
            <ItemWrapper key={sick.sickCd}>
              <SearchSvg width="16" height="16" fill="#A7AFB7" />
              <SickName>{sick.sickNm}</SickName>
            </ItemWrapper>
          ))}
        </ItemList>
      </Container>
    </Wrapper>
  );
};

export default SearchResult;

const Wrapper = styled.div`
  position: relative;
  width: 490px;
`;

const Container = styled.div`
  position: absolute;
  top: 8px;
  width: 100%;
  padding: 16px 0;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0px 0px 8px #00000020;
`;

const ItemList = styled.ul`
  overflow: hidden;
  overflow-y: auto;
  max-height: 500px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #6a737b40;

    border-radius: 10px;
  }
`;

const ItemWrapper = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;

  &:hover {
    background-color: #f4f6fa;
  }
`;

const SickName = styled.p`
  font-size: 18px;
  color: #1e2025;
`;
