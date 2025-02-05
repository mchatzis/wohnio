- Time: ~4 days (cause I had to learn NestJS)
- Objectives:
  - [x] Location CRUD
  - [x] Endpoint for storing weather metric data (temperature for now)
  - [x] Endpoint for querying weather metric data (using location ID)
  - [x] Extra: Quering location within radius (geo querying)

### Run
(Example environment files have been provided.
Please don't change them because I did not use variables in the docker compose file)
```
    docker compose up --build
```

Swagger at:

http://localhost:3000/api/

Mongo Express (to visualize data):

http://localhost:8081/

### Clean up
```
    docker compose down
    
    // OR to also remove database (with data loss)

    docker compose down -v
```

### Tests
```
    docker compose up --build -d
    docker compose exec api bash

    npm run test
```

### Limitations and future work

Please see the `TODO.md`
