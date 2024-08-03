```sh
curl -X POST http://localhost:3004/api/api.v1.user.create -H "Content-Type: application/json" -d '{"name":"name" }'

curl -X POST http://localhost:3004/api/api.v1.user.getList -H "Content-Type: application/json" -d '{"q":"name"}'

docker build -t quochuydev/myapp-backend .

docker push quochuydev/myapp-backend:latest

npx changeset
```
