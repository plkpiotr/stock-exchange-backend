Backend:
- `npm i` to install packages
- `npm start` or `ts-node server.ts` to run backend on localhost:8080
- `nodemon` to run backend on localhost:8080 (reloading after changes in the source code)

To do:
- Create kind of `swagger` documentation with example responses
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
