import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import { Contacts, Groups } from '../imports/api/contacts';


Meteor.startup(() => {
  const contactsCount = Contacts.find().fetch().length;
  console.log('contactsCount', contactsCount);
});

Meteor.publish('contacts', () => { // $in {id1,id2}  underscore  _.pluk
// if(!this.userId){
// Meteor.Error
// }
  const contacts = Contacts.find({}, {
    fields: {
      Name: 1,
      Email: 1,
      createdAt: 1,
    },
  });
  console.log('contactsCount', contacts.fetch());
  return contacts;
});
Meteor.publish('groups', () => {
  const groups = Groups.find({}, {
    fields: {
      name: 1,
    },
  });
  console.log('Groups fetched: ', groups.fetch());
  return groups;
});

Meteor.publish('contact', ({ userId }) => {
  new SimpleSchema({
    userId: {
      type: String,
      optional: true,
    },
  }).validate({ userId });
  const contact = Contacts.findOne({ _id: { userId } }, {
    limit: 1,
  });
  return contact;
});

const schema = new SimpleSchema({
  Name: String,
  Work: String,
  Phones: {
    type: Array,
    minCount: 1,
  },
  'Phones.$': {
    type: String,
    regEx: SimpleSchema.RegEx.Phone,
  },
  Emails: {
    type: Array,
    minCount: 1,
  },
  'Emails.$': {
    type: String,
    regEx: SimpleSchema.RegEx.EmailWithTLD,
  },
  Groups: {
    type: Array,
  },
  'Groups.$': {
    type: String,
  },
  createdBy: {
    type: String,
    optional: true,
  },
  updatedBy: {
    type: String,
    optional: true,
  },
  createdAt: {
    type: String,
    optional: true,
  },
  updatedAt: {
    type: String,
    optional: true,
  },
}).namedContext('userForm');
Meteor.methods({
  'contacts.insert'(contact) {
    console.log('contact', contact);
    if (schema.validate(contact)) {
      console.log(' schema.validate(contact)', schema.isValid());

      Contacts.insert({
        Name: contact.Name,
        Work: contact.Work,
        Phones: contact.Phones,
        Emails: contact.Emails,
        Groups: contact.Groups,
        createdAt: new Date(),
        createdBy: Meteor.userId(),
        updatedBy: Meteor.userId(),
        updatedAt: new Date(),
      });
    } else {
      console.log('errors:', schema.validationErrors());
    }
  },
  'contacts.delete'(contactId) {
    check(contactId, String);
    Contacts.remove(contactId);
  },
  'contacts.edit'(contactId, contact) {
    check(contactId, String);
    if (schema.validate(contact)) {
      Contacts.update(contactId, {
        $set: {
          Name: contact.Name,
          Work: contact.Work,
          Phones: contact.Phones,
          Emails: contact.Emails,
          Groups: contact.Groups,
          createdAt: contact.CreatedAt,
          createdBy: contact.CreatedBy,
          updatedBy: Meteor.userId(),
          updatedAt: new Date(),
        },
      });
    } else {
      console.log('errors:', schema.validationErrors());
    }
  },
  'addGroup'(text) {
    check(text, String);
    Groups.insert(text);
  },

});
