# Stock Exchange Application (Backend)

## Overview

RESTful Web API implemented in TypeScript using Node.js, Express.js, JWT, MongoDB, Mongoose and Heroku.

## Quick start
Install dependencies:
```
npm i
```
Run on localhost:8080:
```
nodemon
```

## Connection with your own database
Replace the connection string in `app.ts` with your own:
```diff
  private static configureDatabase(): void {
-   mongoose.connect('mongodb+srv://stock-exchange:stock-exchange@stock-exchange-btfeh.mongodb.net/' +
-     'test?retryWrites=true&w=majority', {
+   mongoose.connect('your-connection-string', {
      useNewUrlParser: true,
      useCreateIndex: true
    });
  }
```

## Model

### Article

|Field|Type|POST / PUT|
|:----|:----|:----|
|`_id`|`ObjectId`| |
|`created`|`Date`| |
|`description`|`String`|`required`|
|`link`|`String`|`required`|
|`modified`|`Date`| |
|`title`|`String`|`required`|
|`userId`|`ObjectId`| |

### Note

|Field|Type|POST / PUT|
|:----|:----|:----|
|`_id`|`ObjectId`| |
|`created`|`Date`| |
|`description`|`String`|`required`|
|`modified`|`Date`| |
|`title`|`String`|`required`|
|`userId`|`ObjectId`| |

### Transaction

|Field|Type|POST|
|:----|:----|:----|
|`_id`|`ObjectId`| |
|`amount`|`Number`|`required`|
|`comment`|`String`|`required`|
|`date`|`Date`|`required`|
|`symbol`|`String`|`required`|
|`userId`|`ObjectId`| |

### User

|Field|Type|POST|
|:----|:----|:----|
|`_id`|`ObjectId`| |
|`email`|`String`|`required`|
|`password`|`String`|`required`|

## Endpoints

### Article*

|`/articles`|200|201|401|404|409|500|
|:----:|:----:|:----:|:----:|:----:|:----:|:----:|
|GET|&check;|&cross;|&check;|&check;|&cross;|&check;|
|POST|&cross;|&check;|&check;|&cross;|&cross;|&check;|

|`/articles/:id`|200|201|401|404|409|500|
|:----:|:----:|:----:|:----:|:----:|:----:|:----:|
|GET|&check;|&cross;|&check;|&check;|&cross;|&check;|
|PUT|&check;|&cross;|&check;|&cross;|&cross;|&check;|
|DELETE|&check;|&cross;|&check;|&check;|&cross;|&check;|

### Note*

|`/notes`|200|201|401|404|409|500|
|:----:|:----:|:----:|:----:|:----:|:----:|:----:|
|GET|&check;|&cross;|&check;|&check;|&cross;|&check;|
|POST|&cross;|&check;|&check;|&cross;|&cross;|&check;|

|`/notes/:id`|200|201|401|404|409|500|
|:----:|:----:|:----:|:----:|:----:|:----:|:----:|
|GET|&check;|&cross;|&check;|&check;|&cross;|&check;|
|PUT|&check;|&cross;|&check;|&cross;|&cross;|&check;|
|DELETE|&check;|&cross;|&check;|&check;|&cross;|&check;|

### Transaction*

|`/transactions`|200|201|401|404|409|500|
|:----:|:----:|:----:|:----:|:----:|:----:|:----:|
|GET|&check;|&cross;|&check;|&check;|&cross;|&check;|
|POST|&cross;|&check;|&check;|&cross;|&cross;|&check;|

|`/transactions/:id`|200|201|401|404|409|500|
|:----:|:----:|:----:|:----:|:----:|:----:|:----:|
|DELETE|&check;|&cross;|&check;|&check;|&cross;|&check;|

### User

|`/users/register`|200|201|401|404|409|500|
|:----:|:----:|:----:|:----:|:----:|:----:|:----:|
|POST|&cross;|&check;|&cross;|&cross;|&check;|&check;|

|`/users/login`|200|201|401|404|409|500|
|:----:|:----:|:----:|:----:|:----:|:----:|:----:|
|POST|&check;|&cross;|&check;|&check;|&cross;|&check;|

Asterisk indicates that an access token is required.

## Comments
This is a back-end part of Stock Exchange Application.

Visit also a front-end repository: [github.com/plkpiotr/stock-exchange-frontend](https://github.com/plkpiotr/stock-exchange-frontend)

## License
Copyright © 2019, [Piotr Pałka](https://github.com/plkpiotr). Released under the [MIT License](LICENSE).
