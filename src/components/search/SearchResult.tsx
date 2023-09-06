import { Link } from "react-router-dom";
import { styled } from "styled-components";

import SearchSvg from "../../assets/svg/SearchSvg";
import { Sick } from "../../services/search";
import { customScroll } from "../../styles";

interface Props {
  result: Sick[];
  focusIndex: number;
}
const SearchResult = ({ result, focusIndex }: Props) => {
  return (
    <Wrapper>
      <Container>
        <ItemList>
          <ListTitle>추천 검색어</ListTitle>
          {result.length ? (
            result.map((sick, index) => (
              <ItemWrapper $isFocus={focusIndex === index} key={sick.sickCd}>
                <SearchSvg width="16" height="16" fill="#A7AFB7" />
                <SickName to={`/${sick.sickCd}`} state={{ name: sick.sickNm }}>
                  {sick.sickNm}
                </SickName>
              </ItemWrapper>
            ))
          ) : (
            <EmptyMessage>검색어와 일치하는 질환이 없습니다.</EmptyMessage>
          )}
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
  padding: 0 20px 8px;
`;

const ItemWrapper = styled.li<{ $isFocus: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background-color: ${({ $isFocus }) => ($isFocus ? "#f4f6fa" : "transparent")};

  &:hover {
    background-color: #f4f6fa;
  }
`;

const SickName = styled(Link)`
  font-size: 18px;
  color: #1e2025;
`;

const EmptyMessage = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #a7afb7;
  padding: 0 20px;
`;
