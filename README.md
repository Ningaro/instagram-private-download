# Instagram Private Download Server [![gitmoji][gitmoji]][gitmoji-url]

> _Save tool_ 🗳

Backend server based on `Expresss`.

## Features:

-   Determine user ID by Login
-   Get data about the latest user stories

You can use already running server on [Heroku](https://murmuring-fjord-53474.herokuapp.com/getUserStories) or compile it locally following instructions below.

## Install

Quick start guide:

```shell
git clone -b server-master https://github.com/Ningaro/instagram-private-download.git
cd /instagram-private-download
npm install
```

## Usage

This server start at `5000` port if `process.env.PORT` is empty

### Methods

| Method            | Type | `Content-Type` Header | Avaliable Params(see description below) | Desc                                            |
| ----------------- | ---- | --------------------- | --------------------------------------- | ----------------------------------------------- |
| `/getUserStories` | POST | `application/json`    | `{ "login": ..., "token": ... }`        | Return object with stories info or error status |

### Params

| Name  | Type   | Desc                                                                                  |
| ----- | ------ | ------------------------------------------------------------------------------------- |
| login | String | Instagram username without '@' symbol                                                 |
| token | String | Session token (You can get it from Dev Tools on PC), the token is valid for ONE YEAR! |

## Links

List of links to resources related to this project.

-   [Instagram Private Download APP](https://ningaro.github.io/instagram-private-download)
-   [Backend server](https://murmuring-fjord-53474.herokuapp.com/getUserStories)
-   [Frontend branch in repo](https://github.com/Ningaro/instagram-private-download/tree/front-master)
-   [Server branch in repo](https://github.com/Ningaro/instagram-private-download/tree/server-master)

<!-- VARS -->

[gitmoji]: https://img.shields.io/badge/gitmoji-%20%F0%9F%98%9C%20%F0%9F%98%8D-FFDD67.svg?style=flat-square
[gitmoji-url]: https://gitmoji.dev
