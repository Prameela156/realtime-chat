import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./styles.css";

const socket = io("http://localhost:4000");

export default function Chat({ user }: { user: any }) {
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState<string[]>(["General", "Random"]);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const joinRoom = (r: string) => {
    setRoom(r);
    socket.emit("join_room", { room: r, user: user.displayName });
  };

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("send_message", { room, user: user.displayName, text: input });
      setInput("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (msg) => setMessages((prev) => [...prev, msg]));
    socket.on("message_history", (msgs) => setMessages(msgs));
    socket.on("room_users", (users) => setOnlineUsers(users));
  }, []);

  return (
    <div>
      {!room ? (
        <div>
          <h2>Available Rooms</h2>
          {rooms.map((r) => (
            <button key={r} onClick={() => joinRoom(r)}>{r}</button>
          ))}
          <button onClick={() => {
            const newRoom = prompt("Enter room name:");
            if (newRoom) {
              setRooms([...rooms, newRoom]);
              joinRoom(newRoom);
            }
          }}>+ Create Room</button>
        </div>
      ) : (
        <div>
          <h2>Room: {room}</h2>
          <p>Online Users: {onlineUsers.join(", ")}</p>
          <div className="chat-box">
            {messages.map((m, i) => (
              <p key={i}><b>{m.user}:</b> {m.text}</p>
            ))}
          </div>
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}