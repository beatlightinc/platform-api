Usage:
- clone the repo into the same directory as platform-webapp (or whichever app you're using it with) via:
`git clone git@github.com:beatlightinc/platform-api.git`

- cd into /platform-api and run `yarn link`

- cd into the platform-webapp directory and run `yarn link platform-api`

You're ready to go!


Note:

When using with commonJS (where you cant use import) use:

const OutroAPI = require('platform-api');
const API = OutroAPI.default;

API will then have access to the methods of OutroAPI class, whereas OutroAPI will
only have access to the classes variables.
