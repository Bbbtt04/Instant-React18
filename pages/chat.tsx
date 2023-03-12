import UserList from "@/components/UserList"
import { changeName } from "@/store"
import { NAME_KEY } from "@/utils/contents"
import { routerBeforeEach } from "@/utils/router-beforeEah"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { io } from "socket.io-client"
import styled from "styled-components"

function Chat() {
  const socket = io('http://localhost:2999')
  const router = useRouter()
  const dispatch = useDispatch()
  const [currentUser, setCurrentUser] = useState('')
  const [messages, setMessages] = useState([{
    sender: "",
    receiver: "",
    content: ""
  }])

  useEffect(() => {
    routerBeforeEach(router)
    dispatch(changeName(localStorage.getItem(NAME_KEY) || ''))
  }, [])

  return (
    <Container>
      <ChatScreen>
        <UserList
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          messages={messages}
          setMessages={setMessages}
        ></UserList>
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
`

const ChatScreen = styled.div`
  width: 80vw;
  height: 80vh;
  border-radius: 15px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
`

export default Chat
