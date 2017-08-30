## Frontend Framework

### 1. development
```
npm install
npm run build
```

### 2. unit test
```
npm test
```

### 3. how it works?
the main file is inside libs/app.js, when render function excuted, it will first insert all the config.data into the html template and then put new template html string into DOM tree, once new html exist in DOM tree, it will bind all the events functions which are defined in config to the new DOM tree. that's it.
