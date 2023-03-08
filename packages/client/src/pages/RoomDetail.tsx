import React, {useState, useEffect, useRef} from "react";
import styled from "@emotion/styled/macro";
import { Global, css } from "@emotion/react";
import {io} from "socket.io-client";

import TopNavigation from "../components/ChatRoomDetail/TopNavigation";
import MessageList from "../components/ChatRoomDetail/MessageList";
import InputChat from "../components/ChatRoomDetail/InputChat";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import { fetchMyProfile } from "../apis/userApi";
import { fetchChatRoomDetail } from "../apis/roomApi";
import { fetchChatMessageList, sendChatMessage } from "../apis/chatApi";
import { AxiosError, AxiosResponse } from "axios";
import { IProfile, IChat, IRoom } from "../types";

import SentMessage from "../components/ChatRoomDetail/SentMessage";
import ReceivedMessage from "../components/ChatRoomDetail/ReceivedMessage";

const Base = styled.div`
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 64px;
  align-items: center;
  padding: 0 24px;
`;

const globalStyles = css`
  body {
    background-color: #abc1d1;
  }
`;

const RoomDetail: React.FC = () => {
    const scrollBottomRef = useRef<HTMLLIElement>(null);
const { roomId } = useParams<string>();

  const { data: profileData } = useQuery<AxiosResponse<IProfile>, AxiosError>(
    "fetchMyProfile",
    fetchMyProfile
  );
  const { data: chatRoomDetailData } = useQuery<
    AxiosResponse<IRoom>,
    AxiosError
  >(["fetchChatRoomDetail", roomId], () =>
    fetchChatRoomDetail(roomId as string)
  );
  const { data: chatListData } = useQuery<
    AxiosResponse<Array<IChat>>,
    AxiosError
  >(["fetchChatMessageList", roomId], () =>
    fetchChatMessageList(roomId as string)
  );

  const [messages, setMessages] = useState<Array<IChat>>(chatListData?.data || []);

  useEffect(() => {
    const socket = io('http://localhost:8000', {path:"/socket.io"});
  
    socket.emit('join', roomId);

    // create and update chat messages
    socket.on('chat', (newMessage: IChat) => {
      setMessages((prev) => [...prev, newMessage]);
    })
  }, []);

  // call api
  const mutation = useMutation("sendChatMessage", (content: string) =>
    sendChatMessage(roomId as string, content)
  );

  const handleSend = (content: string) => {
    if (content.length) {
      mutation.mutate(content);
    }
  };

  // move bottom when to send or receive messages
  useEffect(() => {
    scrollBottomRef.current?.scrollIntoView({behavior:"smooth"});
  }, [messages]);

  return (
    <Base>
      <Global styles={globalStyles} />
      {chatRoomDetailData && (
        <TopNavigation title={chatRoomDetailData.data.user.username} />
      )}

      <Container>
        <MessageList>
          {messages.map((message) =>
            message.senderId === profileData?.data.userId ? (
              <SentMessage
                key={message.id}
                senderId={message.senderId}
                content={message.content}
                timestamp={message.createdAt}
              />
            ) : (
              <ReceivedMessage
                key={message.id}
                receiver={message.user?.username}
                senderId={message.senderId}
                content={message.content}
                timestamp={message.createdAt}
              />
            )
          )}
          <li ref={scrollBottomRef}/>
        </MessageList>
      </Container>
      <InputChat onClick={handleSend} />
    </Base>
  );
};

export default RoomDetail;
