import React from "react";
import styled from "@emotion/styled/macro";
import {useNavigate} from "react-router-dom";

import TopNavigation from "../components/TopNavigation";
import BottomNavigation from "../components/BottomNavigation";
import Profile from "../components/Profile";
import FriendList from "../components/FriendList";
import Friend from "../components/FriendList/Friend";
import { useMutation, useQuery} from "react-query";
import { fetchMyProfile, fetchUserList } from "../apis/userApi";
import {AxiosError, AxiosResponse} from "axios";
import {IProfile, IUser, IRoom} from "../types";
import { fetchChatRoomList, makeChatRoom, MakeChatRoomRequest } from "../apis/roomApi";


const Base = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 12px;
  box-sizing: border-box;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Summary = styled.small`
  margin: 4px 0;
  padding: 24px 0 0 0;
  font-size: 12px;
`;

const Friends: React.FC = () => {
  const navigate = useNavigate();

  const {data: profileData} = useQuery<AxiosResponse<IProfile>, AxiosError>('fetchMyProfile', fetchMyProfile);

  const {data: userData} = useQuery<AxiosResponse<{count: number; rows: Array<IUser>}>, AxiosError>("fetchUserList", fetchUserList)
  
  const {data: chatRoomListData} = useQuery<AxiosResponse<{count: number; rows: Array<IRoom>}>, AxiosError>("fetchChatRoomList", fetchChatRoomList)

const mutation = useMutation('makeChatRoom', (request: MakeChatRoomRequest) => 
  makeChatRoom(request)
);

  const handleChatRoomCreate = (receiverId: string) => {
    const chatRoom = chatRoomListData?.data.find(chatRoom => chatRoom.receiverId === receiverId);
    if(chatRoom) {
      navigate('/rooms/${chatRoom.id}')
    } else {
      mutation.mutate({
        receiverId
      }, {
        onSuccess: () => {
          navigate('/room/${data.data.id}')
        }
    })
    }
  
  }
  return <Base>
    <Container>
      <TopNavigation title="Contacts" />

      {profileData && <Profile username={profileData.data.username}/>}
      <Summary>Contacts: {userData.data.count}</Summary>
      <FriendList>
        {userData.data.rows.map(row => (
            <Friend
              key={row.id}
              username={row.username}
              thumbnailImg={row.thumbnailImgUrl}
              onClick{() => handleChatRoomCreate(row.id)}
            />
          ))
        }
      </FriendList>

      <BottomNavigation />
    </Container>
  </Base>;
};

export default Friends;
