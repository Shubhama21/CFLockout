import { create } from 'zustand'

const useStore = create((set) => ({
    userCFID: "",
    currentCFID: "",
    username: "",
    token:"",
    setUsername: (name) => set(() => ({ username: name })),
    setUserCFID: (cfid) => set(() => ({ userCFID: cfid })),
    setCurrentCFID: (newCFID) => set(() => ({ currentCFID: newCFID })),
    setToken: (newToken) => set(() => ({ token: newToken })),
}))

export default useStore