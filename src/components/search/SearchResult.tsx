import { styled } from "styled-components";

import SearchSvg from "../../assets/svg/SearchSvg";
import { Sick } from "../../services/search";
import { customScroll } from "../../styles";

interface Props {
  result: Sick[];
}
const SearchResult = ({ result }: Props) => {
  return (
    <Wrapper>
      <Container>
        <ItemList>
          <ListTitle>추천 검색어</ListTitle>
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

  ${customScroll}
`;

const ListTitle = styled.h3`
  font-size: 12px;
  font-weight: 400;
  color: #a7afb7;
  padding: 0 20px;
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
