
import { createSlice } from "@reduxjs/toolkit";
import type { User, Message } from "@/types/hook.types";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ChatState} from "@/types/redux.type";



const initialState: ChatState = {
  users: [],
  receiver: null,
  messages: [],
  input: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setReceiver: (state, action: PayloadAction<User | null>) => {
      state.receiver = action.payload;
      state.messages = [];
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
  },
});

export const { setUsers, setReceiver, setMessages, addMessage, setInput } =
  chatSlice.actions;
export default chatSlice.reducer;
