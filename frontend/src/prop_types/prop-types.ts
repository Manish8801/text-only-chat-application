import type { ChangeEvent } from "react";
import { IConversation, IMessage } from "../types/types";

export interface IGenderCheckboxProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export interface IMessageProps {
  messageObj: IMessage;
}
export interface IConversationProps {
  conversation: IConversation;
  lastIdx: boolean;
  emoji: string;
}
