# shuivuecli
# Description
The challenge in this project is the encryption and decryption of sensitive information contained in the database.
The user can create posts to share important information among the other user but this information will be encrypted in the backend. 
This protects them from leaks. 
In case of an emergency, the user can cancel itself from the DB and render all his posts anonymous!
All the post information is encrypted with Crypto-js.
The token has a time-expired of 15 minutes, after that point the user has to login again. (it has not handled yet the refresh token function)

User stories Features
The app allows the user to create a profile.
The user can create a post with the tag.
The user can filter the post by following the tags available.
The user can unfollow the tags previously selected.
The user can cancel his profile from the system.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
Frontend:
npm run serve
```

Backend:
npm run dev

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
