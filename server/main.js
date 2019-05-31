import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import { Contacts } from '../imports/api/contacts';


Meteor.startup(() => {
  // let contactsCount = Contacts.find().fetch().length;
  // console.log('contactsCount', contactsCount);

  // Contacts.remove({});

  const contactsCount = Contacts.find().fetch().length;
  console.log('contactsCount', contactsCount);

  // for(let i =0; i < 50; i++){
  //   Contacts.insert({firstName: `Mohamad ${i}`, phone: '11111111' })
  // }
});

Meteor.publish('contacts', () => {
  const contacts = Contacts.find({}, {
    fields: {
      Name: 1,
      Email: 1,
    },
  });
  console.log('contactsCount', contacts.fetch());
  return contacts;
});

Meteor.publish('contact', ({ userId }) => {
  new SimpleSchema({
    userId: {
      type: String,
      optional: true,
    },
  }).validate({ userId });
  const contact = Contacts.find({ _id: { userId } }, {
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
        createdBy: this.userId,
        updatedBy: this.userId,
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
    schema.validate(contact);
    Contacts.update(contactId, {
      $set: {
        Name: contact.Name,
        Work: contact.Work,
        Phones: contact.Phones,
        Emails: contact.Emails,
        Groups: contact.Groups,
        createdAt: contact.CreatedAt,
        createdBy: contact.CreatedBy,
        updatedBy: this.userId,
        updatedAt: new Date(),
      },
    });
  },

});
