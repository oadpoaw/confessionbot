<h1 align="center">Welcome to confessionbot 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-12.x-blue.svg" />
  <a href="https://github.com/oadpoaw/confessionbot#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/oadpoaw/confessionbot/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/oadpoaw/confessionbot/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/oadpoaw/confessionbot" />
  </a>
</p>

> confessionbot for discord written in typescript

### 🏠 [Homepage](https://github.com/oadpoaw/confessionbot#readme)

## Prerequisites

- node 12.x

## Usage

### Setting Credentials
Create a file named `.env` containing the following:
```
DISCORD_TOKEN=YourDiscordBotTokenHere
```
Remember to replace `YourDiscordBotTokenHere` with your bot's token

### Starting the bot
```sh
npm run start
```

### Using the bot

Default prefix is `?` <br> <br>

Set up the channels using `set` command! <br>
example:
```sh
set logChannel #logs
set confessionChannel #confessions
```

Enabling/Disabling confessions using `toggle` command! <br>
example:
```sh
toggle
```

Now DM the bot to confess! <br>
example:
```sh
confess <...Your confession>
```


## Commands

Default prefix is `?`

| Name      | Description                        | Usage                                                  | Required Permission to run |
| --------- | ---------------------------------- | ------------------------------------------------------ | -------------------------- |
| set       | Sets the channels                  | `set <'logChannel' or 'confessionChannel'> <#Channel>` | Manage Guild/Manage Server |
| setprefix | Sets the bot's prefix              | `setprefix <prefix>`                                   | Manage Guild/Manage Server |
| toggle    | Toggles to turn on/off confessions | `toggle`                                               | Manage Guild/Manage Server |
| ban       | Ban someone from confessing        | `ban <User>`                                           | Ban Members                |
| unban     | Unbans someone from confessing     | `unban <User>`                                         | Ban Members                |
| ping      | pong!                              | `ping`                                                 | Any                        |

## Author

👤 **oadpoaw**

* Website: https://oadpoaw.xyz/
* Github: [@oadpoaw](https://github.com/oadpoaw)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />
Feel free to check [issues page](https://github.com/oadpoaw/confessionbot/issues). 

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [oadpoaw](https://github.com/oadpoaw).<br />
This project is [MIT](https://github.com/oadpoaw/confessionbot/blob/master/LICENSE) licensed. <br>
If you are gonna use this bot please credit me, it means alot <3