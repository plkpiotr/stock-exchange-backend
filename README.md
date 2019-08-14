Backend:
- `npm start` or `ts-node server.ts` to run backend on localhost:8080
- `nodemon` to run backend on localhost:8080 (reload after changes in source code)

To do:
- Refactoring edit method for user!
- Create kind of `swagger` documentation with example responses
- Change service of lack of notes/articles/transactions (`404` or `401`)
- Add possibility to delete user with all his items

API:
- `/users/register` -> `POST`
- `/users/login` -> `POST`
- `/users/:id` -> `PUT`, `DELETE` (token)
- `/articles` -> `GET`, `POST` (token)
- `/articles/:id` -> `GET`, `PUT`, `DELETE` (token)
- `/notes` -> `GET`, `POST` (token)
- `/notes/:id` -> `GET`, `PUT`, `DELETE` (token)
- `/transactions` -> `GET`, `POST` (token)
- `/transactions/:id` -> `DELETE` (token)
