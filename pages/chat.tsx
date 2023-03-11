import { useEffect, useRef } from "react"
import { io } from "socket.io-client"

function Chat() {
  const socket = io('http://localhost:80')
  const form = useRef<HTMLFormElement>(null)

  useEffect(() => {
    socket.on('chatMessage', (data: any) => {
      console.log(data)
    })
  })

  function send() {
    socket.emit('chatMessage', { message: 'test' })
  }

  return (
    <div>
      <input type="text" />
      <button onClick={() => send()}>Send</button>
      <div>
        <h1>content</h1>
        <ul></ul>
      </div>
    </div>
  )
}

export default Chat
