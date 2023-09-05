import { styled } from "styled-components";

import SearchInput from "../components/SearchInput";
import useInput from "../hooks/useInput";

const Main = () => {
  const { value, onChange } = useInput("");

  return (
    <Wrapper>
      <Title>
        국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기
      </Title>
      <SearchInput value={value} onChange={onChange} />
    </Wrapper>
  );
};

export default Main;

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
