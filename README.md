Backend:
- `npm start` or `ts-node server.ts` to run backend on localhost:8080
- `nodemon` to real time running backend on localhost:8080 in development mode

To do:
- Create kind of `swagger` documentation
- Change service of lack of notes (`404` or `401`)
- Delete user with all his items

API:
- `/users/register` -> `POST`
- `/users/login` -> `POST`
- `/users/:id` -> `PUT`, `DELETE` (token)
- `/articles` -> `GET`, `POST` (token)
- `/articles/:id` -> `GET`, `PUT`, `DELETE` (token)
- `/notes` -> `GET`, `POST` (token)
- `/notes/:id` -> `GET`, `PUT`, `DELETE` (token)
- `/transactions` -> `GET`, `POST` (token)
- `/transactions/:id` -> `GET`, `PUT`, `DELETE` (token)
