
FROM golang:1.8.3
MAINTAINER Yen-Chieh Chen

RUN mkdir -p /go/src/github.com/mongo_project
ADD . /go/src/github.com/mongo_project

WORKDIR /go/src/github.com/mongo_project
RUN go build -o main .

EXPOSE 1232
CMD ["/bin/sh", "-c", "exec /go/src/github.com/mongo_project/main"]