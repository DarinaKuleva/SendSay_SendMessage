import * as React from 'react'
import { useFormikContext } from 'formik'
import { acceptedInputFileMIMETypes } from '../../../constants/messageForm'
import { getCroppedFileName, convertFileToBase64 } from '../../../utils'
import './Attachment.scss'

const Attachment = () => {
  const {
    setFieldValue,
    values: {
      attachments
    },
    errors
  } = useFormikContext()

  const attachFile = async (e) => {
    const files = e.currentTarget.files
    if (!files) return

    const base64File = await convertFileToBase64(files[0])
    const newAttachment = {
      name: files[0].name,
      content: base64File,
      encoding: 'base64',
      size: files[0].size
    }

    setFieldValue('attachments', [...attachments, newAttachment])
    e.currentTarget.value = ''
  }

  const deleteFile = (index) => {
    attachments.splice(index, 1)
    setFieldValue('attachments', attachments)
  }

  return (
    <div>
      <div className={'Attachment'}>
        {attachments.map((attachment, index) =>
          <section
            key={index}
            className={'Attachment__file'}
          >
            <p className={'Attachment__name'}>
              {getCroppedFileName(attachment.name, 17)}
            </p>
            <button
              className={'Attachment__delete'}
              onClick={() => deleteFile(index)}
            >
              Удалить
            </button>
          </section>
        )}
      </div>
      {errors.attachments && <p className={'Attachment__error'}>{errors.attachments}</p>}
      <div className={'Attachment__addContainer'}>
        <label
          className={'Attachment__button'}
          htmlFor={'attachments'}
        >
          Прикрепить файл
        </label>
        <input
          type='file'
          name={'attachments'}
          id={'attachments'}
          onChange={attachFile}
          className={'Attachment__input'}
          accept={acceptedInputFileMIMETypes.join(',')}
        />
      </div>
    </div>
  )
}

export default Attachment
