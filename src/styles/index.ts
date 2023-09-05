import { css } from "styled-components";

export const customScroll = css`
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #6a737b40;

    border-radius: 10px;
  }
`;
