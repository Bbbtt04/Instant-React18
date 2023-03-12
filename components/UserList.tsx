import request from "@/utils/request"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"

export default function UserList({
  currentUser = 'Bbbtt04',
  setCurrentUser = new Function(),
  messages = [{
    sender: "",
    receiver: "",
    content: ""
  }],
  setMessages = new Function()
}) {
  const myName = useSelector((state: any) => state.username.value)
  const [users, setUsers] = useState([{
    username: "",
    avatar: ""
  }])

  function getMessages() {
    request({
      url: "/message/list",
      method: "POST",
      data: {
        // TODO
        "sender": myName,
        "receiver": currentUser
      }
    }).then(res => {
      console.log(res);

      // setMessages(res.data)
    })
  }

  useEffect(() => {
    request({
      url: "/user/all",
      method: "GET"
    }).then(res => {
      setUsers(res.data)
    })
  }, [])

  return (
    <Container>
      <div className="search">
        <input type="text" placeholder="搜索名称" />
      </div>
      {
        users && users.map(user => {
          return (
            <div className="user" key={user.username}>
              <img src={user.avatar} />
              <span>{user.username}</span>
            </div>
          )
        })
      }
    </Container>
  )
}

const Container = styled.div`
  background-color: #363f48;
  width: 20vw;
  height:100%;
  margin-left: 10px;
  .search {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    input {
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      border: none;
      outline: none;
      :focus {
        border: 1px solid #0c729b;
      }
    }
  }
`
