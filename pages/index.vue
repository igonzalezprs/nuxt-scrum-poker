<script setup lang="ts">

// Composables
const { on, emit } = useSocketStore();
const router = useRouter();

// Data
const roomName = ref("Room Name");

// Methods
const createRoom = () => emit("create-room", roomName.value);

// Socket connection
on("room-created", (roomId) => {
  console.log("Room created", roomId);
  router.push(`/room/${roomId}`);
});
</script>

<template>
  <main class="flex flex-col items-center justify-center h-screen">
    <input v-model="roomName" type="text" class="text-center text-lg border-b-2 border-primary">
    <Button class="mt-4" @click="createRoom">
      Create Room
    </Button>
  </main>
</template>