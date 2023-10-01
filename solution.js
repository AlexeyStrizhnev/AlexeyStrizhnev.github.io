// Основной код решения задачи 

// скользящий буфер
let sliding_buffer = []

// целевая функция задания
function processing(new_point) {
    let result = {
        "median": 0,
        "average": 0,
        "dispersion": 0
    }
    // добавление в скользящий буфер новой точки
    sliding_buffer.push(new_point)
    if (sliding_buffer.length < 11) {
        return result
    }
    sliding_buffer.shift()
    // копирование буфера для дальнейшей работы
    let sl_buf_copy = sliding_buffer.slice()
    // сортировка
    sl_buf_copy.sort(function (a, b) {
        return a - b
    })
    // удаление одного миимального и одного максимального значения
    sl_buf_copy = sl_buf_copy.slice(1, -1)

    // медиана
    result.median = median(sl_buf_copy)
    // среднее арифметическое
    result.average = average(sl_buf_copy)
    // дисперсия
    result.dispersion = dispersion(sl_buf_copy, result.average)

    return result
}

function median(buf) {
    let mdn = 0
    if ((buf.length % 2) != 0) {
        mdn = buf[(buf.length - 1) / 2]

    } else {
        mdn = (buf[buf.length / 2] + buf[(buf.length / 2 - 1)]) / 2
    }
    return mdn
}

function average(buf) {
    let sum = 0
    for (val of buf) {
        sum += val
    }
    return sum / buf.length
}

function dispersion(buf, avrg) {
    let sum_squared_deviations = 0
    for (val of buf) {
        sum_squared_deviations += (val - avrg) * (val - avrg)
    }
    return sum_squared_deviations / buf.length
}