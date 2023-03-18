import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import io from 'socket.io-client'

export const useSocketStore = defineStore('socket', () => {
  const socket = io('http://localhost:3000')
  const isConnected = ref(false);
  const socketId = ref('');

  socket.on("connected", () => {
    isConnected.value = true;
    socketId.value = socket.id;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function on(param: string, callback: (args: any) => void) {
    if (isConnected.value) {
      socket.on(param, callback);
    }
    else {
      watch(isConnected, (val) => {
        val && socket.on(param, callback);
      });
    }
  }

  function emit(param: string, args?: unknown) {
    if (isConnected.value) {
      socket.emit(param, args);
    }
    else {
      watch(isConnected, (val) => {
        val && socket.emit(param, args);
      });
    }
  }

  return { socket, isConnected, socketId, on, emit };
});
