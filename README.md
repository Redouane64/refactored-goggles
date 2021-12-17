# NodeJS Github Authentication Sample

### Installation and starting server

1. `yarn install` or `npm install`
2. Create OAuth application through Github Settings
3. Create `.env` with following variables:
  ```
  GITHUB_AUTH_URL=https://github.com/login/oauth/authorize
  GITHUB_CLIENT_ID=
  GITHUB_CLIENT_SECRET=
  ```
4. Run the server with `npm run start:dev`
5. Open `http://127.0.0.1:5000`