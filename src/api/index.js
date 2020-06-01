import Sendsay from 'sendsay-api'
import { API_KEY } from '../constants/api'

const sendsayApi = new Sendsay({
    apiKey: API_KEY
  })

export const requestSendMessage = (values) => sendsayApi.request({
  "action": 'issue.send.test',
  "letter": {
    "subject": values.messageTopic,
    "from.name": values.senderName,
    "from.email": values.senderEmail,
    "to.name": values.recipientName,
    "message": {
      "text": values.message
    },
    "attaches": values.attachments,
  },
  "sendwhen": values.dateNow                                ,
  "mca": [values.recipientEmail],
})

export const getMessageStatus = (trackId) => sendsayApi.request({
  "action": 'track.get',
  "id": trackId
})
