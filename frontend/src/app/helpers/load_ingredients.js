const fs = require('fs')

const apiUrl = 'http://localhost:3001/ingredients'

// Функция для отправки POST-запроса для создания ингредиента
const createIngredient = async (name, units) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        units
      })
    })

    if (response.status === 201) {
      console.log(`Ингредиент "${name}" успешно создан.`)
    } else {
      console.error(`Ошибка при создании ингредиента "${name}".`)
    }
  } catch (error) {
    console.error(
      `Ошибка при отправке POST-запроса для ингредиента "${name}":`,
      error
    )
  }
}

// Чтение CSV-файла
fs.readFile('ingredients.csv', 'utf8', (err, data) => {
  if (err) {
    console.error('Ошибка чтения CSV-файла:', err)
    return
  }

  // Разбиваем CSV-строки на массив строк
  const lines = data.split('\n')

  // Проходим по каждой строке и отправляем POST-запрос
  lines.forEach((line) => {
    const [ingredientName, units] = line.split(';')
    console.log(ingredientName, units)

    createIngredient(ingredientName.trim(), units.trim())
  })
})
