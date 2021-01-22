# Expense tracker

This is an expense tracker which you record your expense.

## Features
First, create an account with your email or Facebook.

Then, you can click "新增支出(create a new expense)" to create a new record, and you can choose one of the five categories:
  + 居家物業(household)
  + 交通出行(traffic)
  + 休閒娛樂(entertainment)
  + 餐飲食品(food)
  + 其他(others)
  
Besides, you can choose category(類別) or month(月份) to select which category or month you want to check and their total amount.

Of course, you can also edit and delete any expense record at any time.

## Download, install and run
If you don't want to download, you can use [online version on heroku](https://limitless-taiga-78110.herokuapp.com/users/login).

If you want to download it, then

+ Use Terminal to download the repository
```
git clone https://github.com/sinon0049/expense-tracker.git
```
+ Download MongoDB and create a database called "expense"
+ Download necessary middlewares in the folder ```expense-tracker```
```
npm install
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
+ You can see ```.env.example```, where there are some data needed to run the project

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
+ bcrypt-js 2.4.3
+ body-parser 1.19.0
+ connect-flash 0.1.1
+ dotenv 8.2.0
+ Passport 0.4.1