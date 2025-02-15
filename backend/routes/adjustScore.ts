import { protectedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { BDI_Questions } from "../data/bdi";
import { MessageSchema } from "../models/Message";
import { setScore } from "../utils/setScore";

const adjustScoreProcedure = protectedProcedure
.input(z.object({ _id: z.string().min(24).max(24), score: z.number().min(0).max(3) }))
.mutation(async ({ input, ctx }) => {
    
    const { _id, score } = input;
    const { conversation } = ctx;
    const index = conversation.messages.findIndex(message => message._id.toString() === _id);
    
    if(index === -1){
        throw new TRPCError({ code: "NOT_FOUND", message: "_id does not exist in the conversation" });
    }

    const message = conversation.messages[index];
    if(!message.confirmationDetails){
        throw new TRPCError({ code: "NOT_FOUND", message: "_id is not of a confirmation message" });
    }else if(message.confirmationDetails.confirmed === true){
        throw new TRPCError({ code: "BAD_REQUEST", message: "Score is already confirmed" });
    }

    try {
        message.confirmationDetails.answer = BDI_Questions[message.confirmationDetails.index].answers[score];
        message.confirmationDetails.score = score;
        message.confirmationDetails.confirmed = true;
        await message.save();
        setScore(conversation, message.confirmationDetails.index, score);
    } catch (error) {
       throw new TRPCError ({ code: "INTERNAL_SERVER_ERROR", message: "Faild to write into database" });
    }

    return message as MessageSchema;
});

export default adjustScoreProcedure;