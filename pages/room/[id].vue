<script setup lang="ts">
import type { Room } from '~/interfaces/poker-room';

// Composables
const route = useRoute();
const router = useRouter();
const { on, emit, socketId } = useSocketStore();

// Data
const allowedValues = [1, 2, 3, 5, 8, 13];
const editName = ref(false);
const name = ref('New User');
const room = ref<Room>({
  id: '',
  name: '',
  users: [],
  showEstimates: false
});

const currentUser = computed(() => room.value.users.find(user => user.id === socketId));
const userName = computed(() => currentUser.value?.name ?? 'New User');
const selectedValue = computed(() => currentUser.value?.storyPoints ?? null);
const showEstimates = computed(() => room.value.showEstimates);

// Methods
const toggleEstimates = () => emit("toggle-estimates", !showEstimates.value);
const deleteEstimates = () => emit("delete-estimates");
const setStoryPoints = (value: number) => emit("set-story-points", value);
const saveName = () => {
  emit("change-name", name.value);
  editName.value = false;
};

// Connecting with socket
emit("join-room", route.params.id);
on("update", (roomData: Room) => {
  room.value = roomData;
});
on("error", (error) => {
  console.log(error);
  router.push('/');
});
</script>

<template>
  <main class="flex flex-col mx-auto py-12 px-8 max-w-xl">
    <h1 class="mb-10 text-3xl">{{ room.name }}</h1>
    <div class="flex max-w-md">
      <template v-if="editName">
        <input v-model="name" class="text-xl bg-transparent mr-5 px-2">
        <Button @click="saveName">Save</Button>
      </template>
      <template v-else>
        <h1 class="text-xl mr-5">{{ userName }}</h1>
        <Button @click="() => editName = true">Change name</Button>
      </template>
    </div>

    <CardWrapper class="mx-auto my-14" :value="selectedValue" @update="setStoryPoints">
      <SelectionCard v-for="value in allowedValues" :key="value" :value="value" />
    </CardWrapper>

    <div class="flex justify-center full-width space-x-4">
      <Button @click="toggleEstimates">{{ showEstimates ? 'Hide' : 'Show' }} Values</Button>
      <Button @click="deleteEstimates">Delete Estimates</Button>
    </div>

    <table class="border-2 w-full shadow-sm mt-8">
      <thead class="bg-gray-100">
        <th class="text-left py-2 px-4">Name</th>
        <th class="text-center py-2 px-4">Story Points</th>
      </thead>
      <tbody>
        <tr v-for="user in room.users" :key="user.id">
          <td class="text-left py-2 px-4">{{ user.name }}</td>
          <td class="flex justify-center py-2 px-4">
            <ResultCard :value="user.storyPoints" :hidden="!showEstimates" />
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>