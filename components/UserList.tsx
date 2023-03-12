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

  function getRandomAvatar() {
    return `https://api.multiavatar.com/Binx%${Math.floor((Math.random() * 50000))}.png`
  }

  function getUserList() {
    request({
      url: "/user/all",
      method: "GET"
    }).then(res => {
      if (res.data) {
        setUsers(res.data)
        let current = res.data[0].username === myName ? res.data[1].username : res.data[0].username
        setCurrentUser(current)
      }
    })
  }

  function isActive(username: string) {
    if (username === currentUser) return 'active'
    return ''
  }

  useEffect(() => {
    getUserList()
  }, [])

  return (
    <Container>
      <div className="search">
        <input type="text" placeholder="搜索名称" />
      </div>
      <div>
        {
          users && users.map(user => {
            if (user.username === myName) return
            return (
              <div
                className={`user ${isActive(user.username)}`}
                key={user.username}
                onClick={() => setCurrentUser(user.username)}
              >
                <img src={user.avatar || getRandomAvatar()} />
                <div className="right">
                  <span className="name">{user.username}</span>
                  <span className="message">
                    回复的信息1111111111111111111
                    回复的信息1111111111111111111
                    回复的信息1111111111111111111
                  </span>
                </div>
              </div>
            )
          })
        }
      </div>
    </Container>
  )
}

const Container = styled.div`
    background-color: #363f48;
    width: 20vw;
    height: 100%;
    border-radius: 15px 0 0 15px;
    .search {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 4rem;
      input {
          margin: 10px 0;
          width: 80%;
          padding: 10px;
          border-radius: 5px;
          border: none;
          outline: none;
          :focus {
            border: 1px solid #00b7ff;
          }
        }
      }
    .user {
      display: flex;
      align-items: center;
      height: 4rem;
      padding-left: 10px;
      img {
        width: 2.5rem;
        height: 2.5rem;
      }
      .right {
        display: flex;
        flex-direction: column;
        margin-left: 15px;
        .name {
          color: #ece9e9;
          font-size: 1.3rem;
        }
        .message {
          width: 12vw;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: keep-all;
          color: #a9a8a8;
          opacity: 0.5;
          font-size: 0.5rem;
        }
      }
    }
    .active{
      background-color: #434e59;
    }
`
