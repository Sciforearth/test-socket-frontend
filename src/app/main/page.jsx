"use client";
import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const Main = () => {
    const socket = useMemo(() => io("https://test-backend-socket.onrender.com"), []);
    let [messages, setMessages] = useState([]);

    useEffect( () => {


   socket.on("connect", () => {
        console.log("I am connected");
    });


         socket.emit("join_room", { room:"123", username: "username" });

         socket.on("receive_message", (data) => {
            console.log(data);
            setMessages((curArr) => {
                let temp = [...curArr]
                temp.push(data)
                return temp;
            });
        });
       

        return () => {
            // socket.off("receive_message");
            // socket.off("connect");
            // socket.disconnect();
        };
    }, []);


    



    

    function joinRoom() {
        let username = document.getElementById("username").value;
        let room = document.getElementById("room").value;

        // if (username && room) {
        //     socket.emit("join_room", { room, username });
        // }
    }

    async function sendMessage() {
        let username = document.getElementById("username").value || "name";
        let room = "123" ;//document.getElementById("room").value;
        let message = document.getElementById("message").value;

        setMessages((curArr) => {
            return [...curArr, { room, username, message }];
        });

        socket.emit("send_message", { room, username, message });
    }

    return (
        <div>
            <input type="text" id="username" placeholder="Enter your name" className=" flex flex-col" />
            <input type="text" id="room" placeholder="Enter room id" />
            <button onClick={joinRoom}>Connect</button>

            <div className="flex flex-col">
                <input type="text" id="message" placeholder="message" className="h-10 w-96 border" />
                <button onClick={sendMessage}>Send</button>

                {messages.map((data, index) => (
                    <p key={index}>{data.username} : {data.message}</p>
                ))}
            </div>
        </div>
    );
};

export default Main;
