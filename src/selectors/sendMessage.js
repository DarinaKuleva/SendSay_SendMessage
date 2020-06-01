export const isLoadingSendMessage = (state) => state.sendMessage.loading
export const isErrorSendMessage = (state) => state.sendMessage.isError
export const messageTrackId = (state) => state.sendMessage.trackId
export const messageTopic = (state) => state.sendMessage.data.messageTopic
export const messageDate = (state) => state.sendMessage.data.dateNow
