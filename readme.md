# Directory API

## Start the development server
ts-node src/bootstrap.ts

## API

### Employees API
Make GET requests to:
```localhost:3000/employee/search?searchString=John```

### Departments API
Make GET requests to:
```localhost:3000/department/search?searchString=Engineering```

## TODO
* Add nodemon to live reload changes
* Create environment variables
* Create build commands in package.json (tsc) for prod builds
* Probably rename bootstrap.ts to server.ts as it makes more sense and is consistent with most other node apps
* Add a logger (currently morgan just logs all http requests which may be good enough for a small app like this)
