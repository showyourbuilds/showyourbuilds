"use client"
import { createContext } from "react";
import io from "socket.io-client";

export const socket = io("http://localhost:3002");

export const SocketContext = createContext();