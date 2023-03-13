import request from "@/utils/request";
import { Button, notification, Spin } from "antd"
import { useEffect, useRef } from "react"
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import styled from "styled-components"

export default function MessageBox({
  currentUser = 'Bbbtt04',
  setCurrentUser = new Function(),
  messages = [{
    sender: "",
    receiver: "",
    content: ""
  }],
  setMessages = new Function(),
}) {
  const socket = io('http://localhost:2999')
  const input = useRef<HTMLTextAreaElement>(null)
  const myName = useSelector((state: any) => state.username.value)

  function send() {
    const value = input.current!.value

    if (value.length > 0) {
      request({
        url: "/message/send",
        method: "post",
        data: {
          content: value,
          sender: myName,
          receiver: currentUser
        }
      }).then(res => {
        setTimeout(() => {
          let chatScreen = document.querySelector(".content") as HTMLElement
          chatScreen.scrollTo(0, chatScreen.scrollHeight)
        }, 10)
        socket.emit('sendMessage', {
          to: currentUser
        })
        input.current!.value = ''
      })
        .catch(err => notification.error({
          message: "发送失败！"
        }))
    } else {
      notification.error({
        message: "信息不能为空哦~"
      })
    }
  }

  return (
    <Container>
      <div className="top">
        <span>
          {currentUser}
        </span>
      </div>
      <div className="content">
        {
          messages.map((messages, index) => {
            return (
              messages.receiver === currentUser
                ?
                <div className='right' key={index}>
                  <span className="item">
                    {messages.content}
                  </span>
                </div>
                :
                <div className='left' key={index}>
                  <span className="item">
                    {messages.content}
                  </span>
                </div>
            )
          })
        }
      </div>
      <div className="bottom">
        <textarea autoFocus ref={input}></textarea>
        <Button className="send" type='primary' onClick={() => send()}>发送信息</Button>
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  color: #fff;
  .top{
    height: 12%;
    background-color: #21252b;
    border-radius: 0 15px 0 0;
    font-size: 2rem;
    display: flex;
    align-items: center;
    span {
      margin-left: 20px;
      background: -webkit-linear-gradient(
            30deg,
            #56ecc7,
            #9f5ad8 25%,
            #56ecc7 50%,
            #9f5ad8 75%,
            #56ecc7
      );
      -webkit-background-clip: text;
      color: transparent;
    }
  }
  .content{
    height: 70%;
    background: #fff;
    opacity: 0.8;
    color: #21252b;
    font-size: 1.4rem;
    overflow-y: scroll;
    .left {
      margin-top: 10px;
      padding-left: 20px;
    }
    .right {
      margin-top: 10px;
      padding-right: 20px;
      text-align: right;
    }
    .item {
      padding:3px 10px;
      border-radius: 20px;
      background: pink;
    }
    .left .item {
      background: #68bea0;
    }
  }
  .bottom {
    height: 18%;
    position: relative;
    border-top: 1px solid #3f3f3f10;
    textarea {
      border-radius: 0 0 15px 0;
      resize: none;
      width: 100%;
      height: 100%;
      outline: none;
      border:none;
      font-size: 1.4rem;
      padding: 3px 0 0 0;
    }
    .send {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`
