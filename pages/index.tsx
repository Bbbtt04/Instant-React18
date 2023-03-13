import React from 'react'
import { Button, Form, Input, notification } from 'antd'
import styled from 'styled-components'
import background from '../public/image/background.png'
import request from '../utils/request';
import { NAME_KEY, TOKEN_KEY } from '../utils/contents';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';

export default function Home() {
    const router = useRouter()
    const socket = io('http://localhost:2999')

    interface FormData {
        username: string,
        password: string,
        confirmedPassword: string;
    }

    const login = (username: string, password: string) => {
        request.post('/auth/login', {
            username,
            password,
        }).then((res: any) => {
            if (res?.data?.access_token) {
                localStorage.setItem(TOKEN_KEY, res.data.access_token)
                localStorage.setItem(NAME_KEY, username)
                notification.success({
                    message: '登录成功！'
                })
                socket.emit("connection", async (socket: { join: (arg0: string) => any; id: any; }) => {
                    await socket.join(username);
                }, (data: any) => {
                    console.log(data);
                })
                router.push('/chat')
            }
        })
    }

    const onFinish = (values: FormData) => {
        if (values.password !== values.confirmedPassword) {
            notification['error']({
                message: "两次密码不一致！",
                duration: 2
            })
            return
        }
        login(values.username, values.password)
    }

    return (
        <Container>
            <img className='background' src={background.src} />
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                className='form'
            >
                <Form.Item
                    label="输入用户名："
                    name="username"
                    className='form-item'
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="请输入密码："
                    name="password"
                    className='form-item'
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="请确认密码："
                    name="confirmedPassword"
                    className='form-item'
                    rules={[{ required: true, message: '请确认密码' }]}
                >
                    <Input.Password></Input.Password>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" className='submit-btn'>
                        登录
                    </Button>

                </Form.Item>
                <p>
                    新用户未注册会自动注册并登录
                </p>
            </Form>
        </Container>)
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  .form {
    background: #fff;
    width: 30vw;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 5px 5px 30px #109fb27b;

    label {
      color: #0e77eede;
      margin-right: 10px;
    }
  }

  .form-item {
    padding: 1vh;
  }

  .background {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: -1;
  }

  .submit-btn {
    :hover {
      background: #3f0eeede;
      color: #ffffff;
      border-color: #3f0eeede;
    }
  }
`
