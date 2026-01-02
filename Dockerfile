FROM golang:1.21.4-alpine3.18 AS gobuilder

RUN mkdir /hnh-food
WORKDIR /hnh-food

COPY main/go.mod main/go.sum ./
RUN go version
RUN go mod download

COPY main .
RUN go build -o hnh-food.go

FROM alpine:3.18.4

RUN mkdir /hnh-food
WORKDIR /hnh-food

COPY --from=gobuilder /hnh-food/hnh-food.go ./
COPY frontend ./frontend

EXPOSE 8080
CMD /hnh-food/hnh-food.go