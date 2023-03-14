import UserList from "@/components/UserList"
import Content from "@/components/Content"
import { changeName } from "@/store"
import { NAME_KEY } from "@/utils/contents"
import request from "@/utils/request"
import { routerBeforeEach } from "@/utils/router-beforeEah"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { io } from "socket.io-client"
import styled from "styled-components"
import { Button } from "antd"

function Chat() {
  const socket = io('http://localhost:2999')
  const router = useRouter()
  const myName = useSelector((state: any) => state.username.value)
  const dispatch = useDispatch()
  const [currentUser, setCurrentUser] = useState('')
  const [messages, setMessages] = useState([{
    sender: "",
    receiver: "",
    content: ""
  }])

  function getMessageList() {
    request({
      url: '/message/list',
      method: "post",
      data: {
        sender: myName,
        receiver: currentUser
      }
    }).then(res => {
      setMessages(res.data)
    })
  }

  useEffect(() => {
    socket.on('showMessage', getMessageList)
    return () => {
      socket.off('showMessage')
    }
  })

  useEffect(() => {
    getMessageList()
  }, [currentUser])

  useEffect(() => {
    routerBeforeEach(router)
    dispatch(changeName(localStorage.getItem(NAME_KEY) || ''))
  }, [])

  function changeAvatar() {
    router.push('/avatar')
  }

  return (
    <Container>
      <div className="header">
        <Button type="dashed" onClick={() => { changeAvatar() }}>更换头像</Button>
      </div>
      <ChatScreen>
        <UserList
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          messages={messages}
          setMessages={setMessages}
        ></UserList>
        <Content
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          messages={messages}
          setMessages={setMessages}
        ></Content>
      </ChatScreen>
    </Container>
  )
}

const Container = styled.div`
  background-color: #d8d7d7;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .header {
    position: fixed;
    top: 1rem;
    left: 5rem;
  }
`

const ChatScreen = styled.div`
  width: 80vw;
  height: 80vh;
  border-radius: 15px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
  display: flex;
`

export default Chat
