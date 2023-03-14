import request from "@/utils/request"
import { routerBeforeEach } from "@/utils/router-beforeEah"
import { Button, Form, Spin } from "antd"
import Input from "antd/es/input/Input"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"

function Avatar() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState({
    avatar: "",
    username: ""
  })
  const myName = useSelector((state: any) => state.username.value)
  const input = useRef(null)

  function getUserInfo() {
    request({
      url: "/user",
      method: "GET",
    }).then((res: any) => {
      console.log(res.data);

      setUserInfo({
        avatar: res.data.avatar,
        username: res.data.username
      })
    })
  }

  function setQQ(qq: string) {
    return `https://q2.qlogo.cn/headimg_dl?dst_uin=${qq}&spec=100`
  }
  function changeAvatar() {
    const value = input.current.input.value

    request({
      url: "/user",
      method: "patch",
      data: {
        username: myName,
        avatar: setQQ(value)
      }
    }).then(res => {
      console.log(res);
      getUserInfo()
    })
  }

  useEffect(() => {
    routerBeforeEach(router)
    getUserInfo()
  }, [])

  return (
    <Container>
      {
        userInfo ? (
          <div>
            <img src={userInfo.avatar} alt="" />
            <Form
              wrapperCol={{ span: 100 }}
              style={{ maxWidth: 600 }}
              layout="inline"
            >
              <Form.Item className="form">
                <Input placeholder="请输入你的qq号" ref={input}></Input>
              </Form.Item>
              <Form.Item>
                <Button onClick={() => changeAvatar()}>更改</Button>
              </Form.Item>
            </Form>
          </div>
        ) : (
          <Spin tip="loading。。。"></Spin>
        )
      }
    </Container >
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
  img {
    width: 12rem;
    height: 12rem;
  }
  .form {
    display: flex;
    flex-direction: row;
  }
`

export default Avatar
