import { ChangeEvent, InputHTMLAttributes, forwardRef } from "react";
import { styled } from "styled-components";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

const Input = forwardRef<HTMLInputElement, Props>(({ value, onChange, ...attrbutes }, ref) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Wrapper>
      <BaseInput {...attrbutes} ref={ref} value={value} onChange={handleChange} />
    </Wrapper>
  );
});

Input.displayName = "Input";
export default Input;

const Wrapper = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
`;
const BaseInput = styled.input`
  width: 100%;
  font-size: 18px;
  color: #1e2025;
`;
