import React from "react";
import styled from "@emotion/styled/macro";

import { FiMail, FiCalendar, FiScissors, FiGift } from "react-icons/fi";

const Base = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  margin-top: 36px;
`;

const IconButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.div`
  font-size: 24px;
`;

const Label = styled.div`
  margin-top: 4px;
`;

const IconButtonList: React.FC = () => {
  return (
    <Base>
      <IconButton>
        <Icon>
          <FiMail />
        </Icon>
        <Label>Mailbox</Label>
      </IconButton>

      <IconButton>
        <Icon>
          <FiCalendar />
        </Icon>
        <Label>Calendar</Label>
      </IconButton>

      <IconButton>
        <Icon>
          <FiScissors />
        </Icon>
        <Label>Hair Salon</Label>
      </IconButton>

      <IconButton>
        <Icon>
          <FiGift />
        </Icon>
        <Label>Gift</Label>
      </IconButton>
    </Base>
  );
};

export default IconButtonList;
