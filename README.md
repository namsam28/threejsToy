Next.js Boiler Plate

## Version
next@v15.1.6  
react@v19.0.0  
react-dom@v19.0.0   
tailwindcss@3.4.1
typescript@5.0.0

## Docker setting

docker, docker-compose settings
  
FROM node:22-alpine

```
# docker로 직접 실행

docker build -t [프로젝트명]:[태그명] .
docker run -d [프로젝트명]:[태그명] .
```


```bash
# compose로 실행처리

docker compose up -d --build
```

## ports
host : localhost:80
container : 3000 
