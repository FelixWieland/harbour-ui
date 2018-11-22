
## Table of Contents

- [Build a Docker Container for development](#build-docker-container)
- [Run the Container with Hot-Reload](#run-the-container-with-hot-reload)

## Build a Docker Container for development

**1. Install Node Modules**
To install the Node Modules for React run following commands:

1. Initial:
```Bash
npm install
```
2. Material UI:
```Bash
npm install @material-ui/core
```
3. Googles SVG Icons:
```Bash
npm install @material-ui/icons
```
4. React Router Dom with:
```Bash
npm install react-router-dom
```
5. simple-git:
```Bash
npm install simple-git
```
6. react-monaco-editor:
```Bash
npm install react-monaco-editor
```
7. Material UI/lab:
```Bash
npm install @material-ui/lab
```

**2. Build the Container**
Build the Container with:
```Bash
docker build harbour --tag harbour
```

## Run the Container with Hot-Reload

**Run the Container**
To run the Container with Hot-Reload make sure to allow Shared Devices in your Docker settings:
Then run following command:
```Bash
docker run -it -v ${PWD}:/usr/src/app -v ${PWD}:/node_modules -p 3000:3000 harbour
```

