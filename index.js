const { program } = require("commander");
const contacts = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;
    case "get":
      const oneContact = await contacts.getContactById(id);
      console.log(oneContact);
      break;
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;
    case "remove":
      const deleteContact = await contacts.removeContact(id);
      console.log(deleteContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <action>", "Action to invoke")
  .option("-i, --id <id>", "Contact id")
  .option("-n, --name <name>", "Contact name")
  .option("-e, --email <email>", "Contact email")
  .option("-p, --phone <phone>", "Contact phone");

program.parse(process.argv);
const options = program.opts();

invokeAction(options).catch((err) => console.error(err));
