import { useState } from "react";
import { styled } from "styled-components";

import Input from "./Input";
import CloseSvg from "../assets/svg/CloseSvg";
import SearchSvg from "../assets/svg/SearchSvg";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput = ({ value, onChange }: Props) => {
  const [isFocus, setIsFocus] = useState(false);

  const handleReset = () => {
    onChange("");
  };

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  return (
    <Wrapper $isFocus={isFocus}>
      <Input value={value} onChange={onChange} onFocus={handleFocus} onBlur={handleBlur} />
      <DeleteWrapper $isFocus={isFocus} onClick={handleReset}>
        <CloseSvg width="10" height="10" />
      </DeleteWrapper>
      <SearchButton>
        <SearchSvg />
      </SearchButton>
    </Wrapper>
  );
};

export default SearchInput;

const Wrapper = styled.div<{ $isFocus: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  width: 490px;
  padding: 10px 10px 10px 20px;
  background-color: #fff;
  border: 2px solid ${({ $isFocus }) => ($isFocus ? "#007be9" : "transparent")};
  border-radius: 42px;
  transition: border 0.1s;
`;

const DeleteWrapper = styled.button<{ $isFocus: boolean }>`
  opacity: ${({ $isFocus }) => ($isFocus ? "1" : "0")};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #a7afb7;
`;

const SearchButton = styled.button`
  width: 48px;
  height: 48px;
  background-color: #007be9;
  border-radius: 50%;
`;
