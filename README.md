## WebHelp. Компонент оглавления

#### Todos:

:heavy_check_mark: Использовать актуальную версию библиотеки React для реализации логики и представления.

:heavy_check_mark: Для написания стилей желательно использовать LESS/SASS, PostCSS, CSS-модули или CSS-in-JS библиотеку.

:heavy_check_mark: Нельзя использовать специализированные библиотеки для построения оглавления и деревьев, но можно использовать вспомогательные (для управления состоянием, анимации и т.п.)

:heavy_check_mark: Данные должны загружаться асинхронно из JSON файла.

:heavy_check_mark: Пока пункты оглавления не отрисованы, пользователь должен видеть “заглушку” из дизайн-макета.

:heavy_check_mark: При клике на корневой элемент ветки или на стрелку рядом с ним, вложенный список должен сворачиваться/разворачиваться.

:heavy_check_mark: Сделать плавные анимации для смены цветов и изменения положения иконки.

#### Plus:

:white_check_mark: JS API

    :heavy_check_mark: выбор активного пункта по ID

Для выбора активного пункта по ID используется поле entityId в компоненте Tree.jsx
 
    - фильтрация пунктов по строке текста
    

:white_check_mark: фильтрацию при вводе текста в элемент input (нет в дизайне)

    - вывод результатов должен происходить не на каждое нажатие клавиши, а после прекращения набора

    - во время ожидания отрисовки можно показать индикатор загрузки

:heavy_plus_sign: анимацию разворачивания/сворачивания ветки

:heavy_check_mark: возможность навигирования по дереву с помощью клавиатуры


#### Available Scripts

In the project directory, you can run:

```npm
npm install
npm start
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

