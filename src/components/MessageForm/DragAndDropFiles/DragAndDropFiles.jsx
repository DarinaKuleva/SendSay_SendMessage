import * as React from 'react'
import './DragAndDropFiles.scss'

const DragAndDropFiles = props => {
  const {data, dispatch, children} = props

  const handleDragEnter = e => {
    e.preventDefault()
    e.stopPropagation()
    dispatch({type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth + 1})
  }

  const handleDragLeave = e => {
    e.preventDefault()
    e.stopPropagation()
    dispatch({type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth - 1})
    if (data.dropDepth > 1) return
    dispatch({type: 'SET_IN_DROP_ZONE', inDropZone: false})
  }

  const handleDragOver = e => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'copy'
    dispatch({type: 'SET_IN_DROP_ZONE', inDropZone: true})
  }

  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    let files = [...e.dataTransfer.files]

    if (files && files.length > 0) {
      const existingFiles = data.attachments.map(f => f.name)
      files = files.filter(f => !existingFiles.includes(f.name))

      dispatch({type: 'ADD_FILE_TO_LIST', files})
      e.dataTransfer.clearData()
      dispatch({type: 'SET_DROP_DEPTH', dropDepth: 0})
      dispatch({type: 'SET_IN_DROP_ZONE', inDropZone: false})
    }
  }

  return (
    <div
      onDrop={e => handleDrop(e)}
      onDragOver={e => handleDragOver(e)}
      onDragEnter={e => handleDragEnter(e)}
      onDragLeave={e => handleDragLeave(e)}
    >
      {data.inDropZone &&
      <div className={'DragAndDropFiles__insideDragArea'}>
        <h2 className={'DragAndDropFiles__title'}>
          Бросайте файлы сюда, я ловлю
        </h2>
        <p className={'DragAndDropFiles--desc'}>
          Мы принимаем картинки (jpg, png, gif), офисные файлы (doc, xls, pdf) и zip-архивы. Размеры файла до 5 МБ
        </p>
      </div>
      }
      {children}
    </div>
  )
}

export default DragAndDropFiles
