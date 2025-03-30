export interface ISignupData {
  fullname: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female" | "other" | undefined;
}
export interface IAuthUser {
  _id: string;
  fullname: string;
  username: string;
  profilePic: string;
  createdAt: string;
  updatedAt: string;
}
export interface IAuthContext {
  user: IAuthUser | null;
  setUser: (user: IAuthUser | null) => void;
}
export interface ISocketContext {
  socket: SocketIOClient.Socket | null;
  onlineUsers: string[];
}
export interface ILoginData {
  username: string;
  password: string;
}
export interface IConversation {
  _id: string;
  fullname: string;
  username: string;
  gender: ISignupData["gender"];
  profilePic: string;
}
export interface IMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  shouldShake: boolean;
}
