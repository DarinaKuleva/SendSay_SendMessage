export const getCroppedFileName = (name, maxLength) => {
  const fileNameWithoutType = name.replace(/\..+$/, '')
  const fileType = name.split(".").pop()

  const croppingLength = fileNameWithoutType.length - maxLength

  if (fileNameWithoutType.length > maxLength) {
    return `${fileNameWithoutType.substring(0, fileNameWithoutType.length-croppingLength)}...${fileType}`
  }
  return `${fileNameWithoutType}.${fileType}`
}

export const convertBytesToMegabytes = (bytes) => bytes / Math.pow(10, 6)

export const getCroppedMessageTopic = (topic, maxSize) => {
  if (topic.length <= maxSize) return topic
  else return `${topic.substring(0, maxSize)}...`
}

export const convertFileToBase64 = file => new Promise((res, rej) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => res(reader.result)
  reader.onerror = error => rej(error)
})
