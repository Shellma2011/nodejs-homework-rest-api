const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");
const { v4 } = require("uuid");

const updateContacts = async (contacts) => {
  const data = JSON.stringify(contacts, null, 2);
  await fs.writeFile(contactsPath, data);
};

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(id) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  if (!result) {
    return null;
  }
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  await contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

async function updateContactById(id, name, email, phone) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  if (!result) {
    return null;
  }

  result.name = name;
  result.email = email;
  result.phone = phone;
  await updateContacts(contacts);
  return result;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const idx = await contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  const [removeContactById] = await contacts.splice(idx, 1);
  await updateContacts(contacts);
  return removeContactById;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContact,
};
