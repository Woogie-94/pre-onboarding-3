import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

import Header from "../components/common/Header";
import SearchInput from "../components/search/SearchInput";
import SearchResult from "../components/search/SearchResult";
import useDebounce from "../hooks/useDebounce";
import useInput from "../hooks/useInput";
import useOutsideClick from "../hooks/useOutsideClick";
import useSearchQuery from "../queries/useSearchQuery";

const Main = () => {
  const [isFocus, setIsFocus] = useState(false);
  const { value, onChange } = useInput("");
  const { data, refetch } = useSearchQuery(value);
  const debounce = useDebounce();

  const isVisible = !!data?.length && isFocus;

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  const focusRef = useRef(null);
  useOutsideClick(focusRef, handleBlur);

  useEffect(() => {
    if (value) {
      debounce(refetch, 200);
    }
  }, [value, debounce, refetch]);

  return (
    <Background>
      <Header />
      <Wrapper>
        <Title>
          국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기
        </Title>
        <div ref={focusRef}>
          <SearchInput value={value} isFocus={isFocus} onChange={onChange} onFocus={handleFocus} />
          {isVisible && <SearchResult result={data} />}
        </div>
      </Wrapper>
    </Background>
  );
};

export default Main;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f4f6fa;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0 160px;
  background-color: #cae9ff;
`;
const Title = styled.h2`
  font-size: 2.125rem;
  color: #1e2025;
  text-align: center;
  margin-bottom: 40px;
`;
