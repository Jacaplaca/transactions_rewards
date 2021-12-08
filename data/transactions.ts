import { nanoid } from "nanoid";
const Chance = require("chance");
const chance = new Chance();

const generateUsers = () => {
  const numberOfUsers = 5;
  const users = [];
  for (let i = 0; i < numberOfUsers; i++) {
    const user = {
      id: nanoid(10),
      name: chance.name(),
    };
    users.push(user);
  }
  return users;
};

const generateTransactions = () => {
  const numberOfTransactions = 50;
  const transactions = [];
  const users = generateUsers();

  for (let i = 0; i < numberOfTransactions; i++) {
    const user = chance.pickone(users);
    const transaction = {
      id: nanoid(10),
      userId: user.id,
      userName: user.name,
      amount: chance.floating({ min: 10, max: 350, fixed: 0 }),
      date: chance.date({ year: 2020, month: chance.pickone([3, 4, 5]) }),
    };
    transactions.push(transaction);
  }
  return transactions;
};

export default generateTransactions;
