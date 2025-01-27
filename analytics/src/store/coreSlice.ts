import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { trpc } from "../trpc";
import { TRPCClientError } from "@trpc/client";
import { ConversationSchema } from "../../../backend/models/Conversation";
import { castDraft } from "immer";
import { SingleData } from "../types/cleanConversation";
import { cleanData } from "../utils/cleanData";

interface CoreState {
  conversations: ConversationSchema[];
  cleanData: SingleData[];
  status: "success" | "idle" | "failed" | "loading";
}

const initialState: CoreState = {
  conversations: [],
  cleanData: [],
  status: "idle",
};

export const fetchAllConversations = createAsyncThunk<
  ConversationSchema[],
  undefined,
  { rejectValue: string }
>(
  "conversation/fetchAllConversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await trpc.getAllConversation.query();
      return response as ConversationSchema[];
    } catch (error) {
      if (error instanceof TRPCClientError) {
        return rejectWithValue(error.message);
      }
    }
    return rejectWithValue("Failed to fetch conversations");
  }
);

const coreSlice = createSlice({
  name: "core",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllConversations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllConversations.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchAllConversations.fulfilled, (state, action: PayloadAction<ConversationSchema[]>) => {
        try {
          state.conversations = castDraft(action.payload);
          state.cleanData = cleanData(state.conversations);
          state.status = "success";
        } catch (error) {
          console.log(error);
          state.status = "failed";
        }
        
      });
  },
});

const coreReducer = coreSlice.reducer;
export default coreReducer;
