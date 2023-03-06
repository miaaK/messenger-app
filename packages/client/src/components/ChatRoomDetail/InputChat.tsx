import React, { useState, useRef } from "react";
import styled from "@emotion/styled/macro";

import { AiOutlineArrowUp } from "react-icons/ai";
import { BsPlusSquare } from "react-icons/bs";
import { useTheme } from "@emotion/react";

const Base = styled.div<{ borderColor: string; backgroundColor: string }>`
  width: 100%;
  height: 48px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  border-top: 1px solid ${({ borderColor }) => borderColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 4px;
`;

const PlusBtnWrapper = styled.div``;

const PlusBtn = styled.button`
  width: 48px;
  height: 48px;
  font-size: 20px;
  border: none;
  background-color: transparent;
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Input = styled.input<{ borderColor: string; backgroundColor: string }>`
  border: 1px solid ${({ borderColor }) => borderColor};
  background-color: transparent;
  border-radius: 16px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 4px 8px;
  font-size: 16px;
`;

const SendBtnWrapper = styled.div`
  margin-left: 8px;
  box-sizing: border-box;
`;

const SendBtn = styled.button<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 16px;
  &:active {
    opacity: 0.7;
  }
`;

interface Props {
  onClick(content: string): void;
}

const InputChat: React.FC<Props> = ({ onClick }) => {
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState<string>("");

  const handleClick = () => {
    onClick(content);

    setContent("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <Base
      borderColor={theme.colors.gray[100]}
      backgroundColor={theme.colors.white}
    >
      <PlusBtnWrapper>
        <PlusBtn>
          <BsPlusSquare />
        </PlusBtn>
      </PlusBtnWrapper>
      <InputWrapper>
        <Input
          ref={inputRef}
          borderColor={theme.colors.gray[200]}
          backgroundColor={theme.colors.gray[100]}
          onChange={handleChange}
        />
      </InputWrapper>
      <SendBtnWrapper>
        <SendBtn backgroundColor={theme.colors.primary} onClick={handleClick}>
          <AiOutlineArrowUp />
        </SendBtn>
      </SendBtnWrapper>
    </Base>
  );
};

export default InputChat;
