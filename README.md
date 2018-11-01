
## Table of Contents

- [Build a Docker Container for development](#build-docker-container)
- [Run the Container with Hot-Reload](#run-the-container-with-hot-reload)

## Build a Docker Container for development

**1. Install Node Modules**
To install the Node Modules for React run:
```Bash
npm install
```
Then install Googles Material UI with:
```Bash
npm install @material-ui/core
```
Then install Googles SVG Icons with:
```Bash
npm install @material-ui/icons
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
