import { useAppDispatch, useAppSelector } from "../store";
import ChatBubble from "./ChatBubble";

import React, { useEffect, useRef, useState } from "react";
import { fetchPreviousConversation, } from "../store/conversatioSlice";
import TypingBubble from "./TypingBubble";
import ChatContainerBottom from "./ChatContainerBottom";
import ChatLoadingSkeleton from "./ChatLoadingSkeleton";
const ChatContainer = () => {
    
    const messages = useAppSelector(state  => state.conversation.messages);
    const conversationId = useAppSelector(state  => state.conversation._id);
    const status = useAppSelector(state  => state.conversation.status);
    const conversationDivRef = useRef<HTMLDivElement>(null);

    const [ firstLand,  setFirstLand]  = useState(true);


    const dispatch = useAppDispatch();

    useEffect(() => {
        if(conversationId){
            dispatch(fetchPreviousConversation());
        }
    }, [conversationId]);

    useEffect(() => {
        if(conversationDivRef.current && !firstLand){
            conversationDivRef.current.scrollTo({ top: conversationDivRef.current.scrollHeight, behavior: "smooth" });
        }else if(conversationDivRef.current && firstLand){
            conversationDivRef.current.scrollTo({ top: conversationDivRef.current.scrollHeight, behavior: "instant" });
        }
    },[messages])


    return (
        <div className="w-full h-full flex justify-center">
            <div className="flex flex-col h-full w-full md:w-1/2 md:h-auto  bg-base-300 pl-2 relative">
                <div className="relative h-full">
                    <div className="absolute bottom-0 right-0 left-0 max-h-full overflow-x-hidden overflow-y-auto pb-16 scrollbar-hide"  ref={conversationDivRef}>
                        {messages.map(message => (
                            <ChatBubble message={message} key={message._id}/>
                        ))}
                        {(status==="loading") &&  (<ChatLoadingSkeleton />)}
                        {status==="waiting" && ( <TypingBubble />)}
                    </div>
                </div>
                <ChatContainerBottom />
            </div>
        </div>
    )
};

export default ChatContainer;