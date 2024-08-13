import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

export const Container: React.FC = (() => {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        axios.get("http://localhost:5047/messages")
            .then(response => setMessages(response.data));
    }, []);

    return <MessagesPage value={messages} />
});

export const MessagesPage = ({ value }: { value: string[] }) =>
    <>
        <h1>Messages</h1>
        {value.length === 0 && <span>...Loading</span>}
        {value.length > 0 && (
            <ul>
                {value.map(messages => <li>{messages}</li>)}
            </ul>
        )}
    </>;

export default Container;