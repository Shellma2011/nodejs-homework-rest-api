const fs = require("fs/promises");
const path = require("path");
console.log(__dirname);

const contactsPath = path.join(__dirname, "contacts.json");
const { v4 } = require("uuid");

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
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const idx = await contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  const [removeContactById] = await contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removeContactById;
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
  await updateContactById(contacts);
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById,
};
