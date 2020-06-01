const monthAbbreviation =
  [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
  ]

export const getDateNow = () => {
  const date = new Date()
  const month = date.getMonth()
  const day = date.getDate()

  return [day, monthAbbreviation[(month - 1)]].join(' ')
}
