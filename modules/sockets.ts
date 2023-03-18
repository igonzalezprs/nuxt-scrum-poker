import { Server } from 'socket.io'
import { defineNuxtModule } from '@nuxt/kit'
import { Room, User } from '~~/interfaces/poker-room'
import { v4 as uuidv4 } from 'uuid';

const rooms: Room[] = []

export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook('listen', (server) => {
      const io = new Server(server)

      nuxt.hook('close', () => io.close())

      io.on('connection', (socket) => {
        console.log("User connected", socket.id)
        socket.emit("connected")
        const userId = socket.id
        let userRoom: Room
        let user: User

        const broadcastUpdate = () => {
          console.log(`Broadcasting update to room ${userRoom.id}`,)
          io.to(userRoom.id).emit("update", userRoom)
        }

        socket.on('create-room', (roomName) => {
          console.log(`User ${socket.id} creating room: ${roomName}`)
          const roomId = uuidv4()
          rooms.push({
            id: roomId,
            name: roomName,
            users: [],
            showEstimates: false
          })
          socket.emit('room-created', roomId)
        })

        socket.on('join-room', (roomId) => {
          console.log(`User ${socket.id} joining room ${roomId}`)
          const room = rooms.find(r => r.id === roomId)
          if (room) {
            userRoom = room
            userRoom.users.push({
              id: socket.id,
              name: 'New User',
              storyPoints: null
            })
            socket.join(userRoom.id)
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            user = userRoom.users.find(user => user.id === userId)!
            broadcastUpdate()
          }
          else {
            console.warn(`User ${socket.id} trying to access non existent room`)
            socket.emit('error', {
              message: "The room you're trying to join does not exist"
            })
          }
        })

        socket.on('change-name', (newName) => {
          console.log(`User ${socket.id} changing name to ${newName}`)
          user.name = newName
          broadcastUpdate()
        })

        socket.on('set-story-points', (points) => {
          console.log(`User ${socket.id} setting story points ${points}`)
          user.storyPoints = points
          broadcastUpdate()
        })

        socket.on('delete-estimates', () => {
          console.log(`User ${socket.id} Deleting estimates`)
          userRoom.users.forEach(user => {
            user.storyPoints = null
          });
          broadcastUpdate()
        })

        socket.on('toggle-estimates', (value) => {
          console.log(`User ${socket.id} toggling estimates`)
          userRoom.showEstimates = value
          broadcastUpdate()
        })

        socket.on('disconnect', () => {
          console.log(`User ${socket.id} disconnecting`)
          if (userRoom) {
            userRoom.users.splice(userRoom.users.findIndex(u => u.id === socket.id), 1)
            if (userRoom.users.length === 0) {
              console.log("Removing room")
              rooms.splice(rooms.findIndex(r => r.id === userRoom.id), 1)
            } else {
              console.log("Updating room")
              broadcastUpdate()
            }
          }
        })
      })
    })
  },
})