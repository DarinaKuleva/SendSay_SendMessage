import * as Yup from 'yup'
import { convertBytesToMegabytes } from './'
import { MAX_FILES_SIZE_IN_MB, MAX_ONE_FILE_SIZE_IN_MB } from '../constants/messageForm'

export const initialValues = {
  ['senderName']: '',
  ['senderEmail']: '',
  ['recipientName']: '',
  ['recipientEmail']: '',
  ['messageTopic']: '',
  ['message']: '',
  ['attachments']: []
}

export const schemaValidation = Yup.object().shape({
  ['senderName']:
    Yup.string()
      .required('Имя не может быть пустым'),
  ['senderEmail']:
    Yup.string()
      .required('Email не может быть пустым')
      .email('Введён неккоректный Email'),
  ['recipientName']:
    Yup.string()
      .required('Имя не может быть пустым'),
  ['recipientEmail']:
    Yup.string()
      .required('Email не может быть пустым')
      .email('Введён неккоректный Email'),
  ['messageTopic']:
    Yup.string()
      .required('Тема письма не может быть пустой'),
  ['message']:
    Yup.string()
      .required('Сообщение не может быть пустым'),
  ['attachments']:
    Yup.array()
      .test('All files max size', 'Размер прикрепляемых файлов не должен превышать 20 МБ', (files) => {
        let filesSize = 0
        files.forEach(file => (filesSize += file.size))

        return (convertBytesToMegabytes(filesSize) <= MAX_FILES_SIZE_IN_MB)
      })
      .test('One file max size' ,'Размер файла не должен превышать 5 МБ', (files) => {
        let filesSize = 0
        files.map(file => {
          if(convertBytesToMegabytes(file.size) >= MAX_ONE_FILE_SIZE_IN_MB) {
            filesSize++
          }
        })
        if (filesSize > 0) return false
          else return true
      })
})
