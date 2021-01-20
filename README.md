# Expense tracker

This is an expense tracker which you record your expense.

## Features

You can click "新增支出(create a new expense)" to create a new record, and you can choose one of the five categories:
  + 居家物業(household)
  + 交通出行(traffic)
  + 休閒娛樂(entertainment)
  + 餐飲食品(food)
  + 其他(others)
  
Besides, you can choose any category(or "所有類別", which means all of them) to select which category you want to check and their total amount.

Of course, you can also edit and delete any expense record at any time.

## Download, install and run
If you don't want to download, you can use [online version on heroku](https://gentle-waters-35764.herokuapp.com/).

If you want to download it, then

+ Use Terminal to download the repository
```
git clone https://github.com/sinon0049/expense-tracker.git
```
+ Download MongoDB and create a database called "expense"
+ Download Express and Handlebars in the folder ```expense-tracker```
```
npm i express
npm i express-handlebars
npm i body-parser
npm i mongoose
npm i method-override
```
or install them together
```
npm i express express-handlebars body-parser mongoose method-override
```
+ Use npm command to add seed data
```
npm run seed
```
or run the project directly
```
npm run dev
```
If succeeded, Terminal will show 
```
Expense tracker is listening on http://localhost:3000
mongodb connected!
```
, and you can use it on your browser with the address http://localhost:3000/

## Environments and utilities
+ Node.js v10.15.0
+ Express 4.17.1
+ Handlebars 5.2.0
+ bootstrap 4.2.1
+ jquery 3.3.1
+ Font Awesome
+ MongoDB
+ Mongoose 5.10.14
+ Method-override 3.0.0