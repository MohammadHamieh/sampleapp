import { Mongo } from 'meteor/mongo';

export const Contacts = new Mongo.Collection('contacts');

export const Groups = new Mongo.Collection('groups');