import React from "react";
import { useParams } from "react-router-dom";

const Container: React.FC = (() => {
    const { id } = useParams<{ id: string }>();
    return <MessageDetails id={id} />;
});

const MessageDetails = ({ id }: { id: string | undefined }) => {
    return <h1>Message Details {id}</h1>;
};

export default Container;