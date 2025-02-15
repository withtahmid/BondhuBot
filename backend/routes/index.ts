import { router } from "../trpc";
import startProcedure from "./startConversation";
import sendMessageProcedure from "./sendMessage";
import fetchPreviousProcedure from "./fetchPreviouMessage";
import adjustScoreProcedure from "./adjustScore";
import submitFeedbackProcedure from "./submitFeedback"
import getScoreDistribution from "./getScoreDistribution";
import getAllConversationProcedure from "./retriveAllConversation"
export const appRouter = router({
    start: startProcedure,
    sendMessage: sendMessageProcedure,
    fetchPrevious: fetchPreviousProcedure,
    adjustScore: adjustScoreProcedure,
    submitFeedback: submitFeedbackProcedure,
    scoreDistribution: getScoreDistribution,
    getAllConversation: getAllConversationProcedure,
});

export type AppRouter = typeof appRouter;