import { KeyboardEvent, useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import MainBackgroundSvg_1 from "../assets/svg/MainBackgroundSvg_1";
import MainBackgroundSvg_2 from "../assets/svg/MainBackgroundSvg_2";
import MainBackgroundSvg_3 from "../assets/svg/MainBackgroundSvg_3";
import Header from "../components/common/Header";
import SearchInput from "../components/search/SearchInput";
import SearchResult from "../components/search/SearchResult";
import useDebounce from "../hooks/useDebounce";
import useInput from "../hooks/useInput";
import useOutsideClick from "../hooks/useOutsideClick";
import useSearchQuery from "../queries/useSearchQuery";

const Main = () => {
  const navigation = useNavigate();
  const [isFocus, setIsFocus] = useState(false);
  const [keyIndex, dispatch] = useReducer(keyControlReducer, START_KEY_INDEX);
  const [searchValue, onChange] = useInput("");
  const { data, refetch } = useSearchQuery(searchValue);

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleChange = (value: string) => {
    dispatch({ type: "RESET_INDEX" });
    onChange(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.nativeEvent.isComposing || !data) {
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        dispatch({ type: "NEXT_INDEX", maxLength: data.length - 1 });
        break;
      case "ArrowUp":
        dispatch({ type: "PREV_INDEX" });
        break;
      case "Enter": {
        navigation(data[keyIndex].sickCd, { state: { name: data[keyIndex].sickNm } });
        break;
      }
    }
  };

  const focusRef = useRef(null);
  useOutsideClick(focusRef, () => {
    setIsFocus(false);
  });

  const debounce = useDebounce();
  useEffect(() => {
    if (searchValue) {
      debounce(refetch, 200);
    }
  }, [searchValue, debounce, refetch]);

  const isVisible = !!data?.length && isFocus;

  return (
    <Wrapper>
      <Header />
      <Inner>
        <Title>
          국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기
        </Title>
        <div ref={focusRef} onKeyDown={handleKeyDown}>
          <SearchInput value={searchValue} isFocus={isFocus} onChange={handleChange} onFocus={handleFocus} />
          {isVisible && <SearchResult result={data} focusIndex={keyIndex} />}
        </div>
        <MainSvg1>
          <MainBackgroundSvg_1 />
        </MainSvg1>
        <MainSvg2>
          <MainBackgroundSvg_2 />
        </MainSvg2>
        <MainSvg3>
          <MainBackgroundSvg_3 />
        </MainSvg3>
      </Inner>
    </Wrapper>
  );
};

export default Main;

type Action = { type: "NEXT_INDEX"; maxLength: number } | { type: "PREV_INDEX" } | { type: "RESET_INDEX" };
const START_KEY_INDEX = -1;
const keyControlReducer = (state: number, action: Action) => {
  switch (action.type) {
    case "NEXT_INDEX":
      return state >= action.maxLength ? action.maxLength : state + 1;
    case "PREV_INDEX":
      return state <= 0 ? 0 : state - 1;
    case "RESET_INDEX":
      return START_KEY_INDEX;
    default:
      return state;
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #cae9ff;
`;
const Inner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1040px;
  padding: 80px 0 160px;
`;
const Title = styled.h2`
  font-size: 2.125rem;
  line-height: 1.6;
  color: #1e2025;
  text-align: center;
  margin-bottom: 40px;
`;
const MainSvg1 = styled.div`
  position: absolute;
  left: 0;
  top: 200px;
`;
const MainSvg2 = styled.div`
  position: absolute;
  right: 124px;
  top: 288px;
`;
const MainSvg3 = styled.div`
  position: absolute;
  right: 28px;
  top: 188px;
`;
