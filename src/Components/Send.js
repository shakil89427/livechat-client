import React, { useEffect, useRef } from "react";
import useAuth from "../AuthProvider/useAuth";

const Send = () => {
  const { socket, user, room, allMsg, setAllMsg } = useAuth();
  const divRef = useRef(null);
  const sendmsg = async (e) => {
    e.preventDefault();
    const data = {
      room,
      user,
      msg: e.target[0].value,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    await socket.emit("send_msg", data);
    setAllMsg((list) => [...list, data]);
    e.target.reset();
  };

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, [allMsg]);
  return (
    <div className="chat-main">
      <div className="chat-header">
        <h3>Live Chat</h3>
      </div>
      <div className="chat-body">
        {allMsg.map((single) => (
          <div className="msgdiv">
            <div>
              <div className={single.user === user ? "you" : "other"}>
                <p className="msg">{single.msg}</p>
                <small>{single.user === user ? "You" : single.user}</small>
                <small className="time">at</small>
                <small>{single.time}</small>
              </div>
            </div>
          </div>
        ))}
        <div ref={divRef}></div>
      </div>
      <form className="chat-footer" onSubmit={sendmsg}>
        <input required type="text" placeholder="Type your Message" />
        <button type="submit">
          <i className="fas fa-arrow-right"></i>
        </button>
      </form>
    </div>
  );
};

export default Send;
