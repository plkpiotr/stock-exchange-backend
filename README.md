Backend:
- `npm start` or `ts-node server.ts` to run backend on localhost:8080
- `nodemon` to real time running backend on localhost:8080 in development mode

To do:
- Create kind of `swagger` documentation
- Change service of lack of notes (`404` or `401`)
- Delete user with all his items

User:
- `/users/:userId` -> PUT, DELETE
- `/users/register` -> POST
- `/users/login` -> POST

Article:
- `/articles` -> GET, POST
- `/articles/:articleId` -> GET, PUT, DELETE

Note:
- `/notes` -> GET, POST
- `/notes/:noteId` -> GET, PUT, DELETE

Transaction:
- `/transactions` -> GET, POST
- `/transactions/:transactionId` -> GET, PUT, DELETE
```
