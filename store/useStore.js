import create from "zustand"

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))

const useStoreUsers = create((set) => ({
  users: [],
  setUsers: (payload) => set({ users: payload }),
  addUser: (payload) => set((state) => ({ users: state.users.apped(payload) })),
  selectedUser: {},
  setSelectedUser: (payload) => set({ selectedUser: payload }),
  isIn: true,
  setIsIn: (payload) => set({ isIn: payload }),
}))

export { useStoreUsers }
