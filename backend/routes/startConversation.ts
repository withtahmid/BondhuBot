import { publicProcedure } from "../trpc";
import { z } from "zod"
import Conversation, {DemographicInfoSchema } from "../models/Conversation";
import Message  from "../models/Message";
import { getInitialGreeting } from "../data/config"
import { TRPCError } from "@trpc/server";
const schema = z.array(
    z.object({
        key: z.string(),
        selected: z.string().or(z.array(z.string())),
        otherValue: z.string()
    })
);


const startProcedure = publicProcedure
.input(schema)
.mutation(async( { input } ) => {
    
    const demographicInfos = input as DemographicInfoSchema[];
    try {
        var conversation = new Conversation({
            currentIndex: -1,
            scores: [],
            currentQuestionContext: [],
            feedback: [],
            demographicInfos: demographicInfos,
            startTime: Date.now(),
            endTime: undefined,
            isFinished: false,
            toldQuestionLeftIndex: -1,
            obtainedScore: 0,
        });

        const initialGreeting = getInitialGreeting();

        const greetingMessage = new Message({ sender: "Assistant", text: initialGreeting, timestamp: Date.now() });
        conversation.messages.push(greetingMessage);
        conversation.currentQuestionContext.push({ sender: "Assistant", text: initialGreeting });
        await Promise.all( [ greetingMessage.save(), conversation.save() ]);

    } catch (error) {

        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to start conversation" });
    }


    return conversation._id;

});

export default startProcedure;