import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

export type Message = {
    id: number;
    content: string;
}

export const Container: React.FC = (() => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        axios.get("http://localhost:5047/messages")
            .then(response => setMessages(response.data));
    }, []);

    return <MessagesPage value={messages} />
});

export const MessagesPage = ({ value }: { value: Message[] }) =>
    <>
        <h1>Messages</h1>
        {value.length === 0 && <span>...Loading</span>}
        {value.length > 0 && (
            <ul>
                {value.map(message => <li key={message.id}>{message.content}</li>)}
            </ul>
        )}
    </>;

export default Container;