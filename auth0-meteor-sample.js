import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
//import { Lock } from 'meteor/auth0:lock';

if (Meteor.isClient) {

  Template.main.onRendered(function () {

  });

  Template.main.events({
    'click button.login': function (e) {
      e.preventDefault();
      lock.show(function (err, profile, token) {
        Session.set("profile", profile);
        Session.set("id_token", token)
      });
    },
    'click button.logout': function () {
      Meteor.logout();
    },
    'click button.call_ext_api': function () {
      Meteor.call('getDataFromExtApi', Session.get("id_token"), function (err, res) {
        if (err) {
          Session.set("response", err);
        } else {
          Session.set("response", res);
        }
      });
    }
  });
  
  Template.main.helpers({
    getProvider: function (identities) {
      return identities[0].provider;
    },

    getIdToken: function() {
      //console.log(self);
      var hash = Session.get("hash");
      return Session.get("id_token");
    },
    response: function() {
      return Session.get("response") ? Session.get("response") : [];
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.methods({
      // The method expects a valid IPv4 address
      'getDataFromExtApi': function (id_token) {
       this.unblock();
        console.log('Method.geoJsonForIp for', id_token);
       // Construct the API URL
       console.log(Meteor.settings);
       var apiUrl = Meteor.settings.public.WEBTASK_BASE_URL + Meteor.settings.public.WEBTASK_API_PATH;

        var body = {"api_url": Meteor.settings.public.EXTERNAL_IDP_URL};
        // query the API
        try {
          var result = HTTP.call('POST', apiUrl, {
            headers: {
              Authorization: 'Bearer ' + id_token,
              'Content-Type': 'application/json'
            },
            data: body
          });
          return JSON.parse(result.content);
        } catch (e) {
          console.log(e);
          return ({error: 'An error occured'});
        }
      }
    });
  });
}

