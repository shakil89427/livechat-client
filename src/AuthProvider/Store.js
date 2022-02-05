import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://lit-fortress-11652.herokuapp.com/");

const Store = () => {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [allMsg, setAllMsg] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    socket.on("receive_msg", (data) => {
      setAllMsg((list) => [...list, data]);
    });
  }, [socket]);
  return {
    socket,
    user,
    setUser,
    room,
    setRoom,
    allMsg,
    setAllMsg,
    show,
    setShow,
  };
};

export default Store;
