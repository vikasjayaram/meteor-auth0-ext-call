# Lock & Meteor sample

This sample project shows how to use [Meteor](https://www.meteor.com/) with Lock and calling a external webtask to fetch data from the IDP using the users idp `access_token`.

## Important

```bash
cp settings.dev.json settings.json
# Add in the fields in the settings.json file

```

Set your Auth0 account ClientID, Domain, Webtask Base Url, Webtask Rest Api Path, External IDP API Url  in the [settings.json](https://github.com/vikasjayaram/meteor-auth0-ext-call/blob/master/settings.dev.json) file. Also, set the callback URL on the settings section of your Auth0 App.

## Running the example

In order to run the example you just need `meteor` installed. Then run:

```bash
meteor --settings settings.json
```

Go to `http://localhost:3000` and you'll see the app running & working :boom:.
