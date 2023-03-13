const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data')

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Drop existing thoughts and users
  await Thought.deleteMany({});
  await User.deleteMany({});

  // Create empty arrayt to hold the users
  const users = [];
  const thoughts = getRandomThoughts(10);

  // Loop 10 times -- add username to the username array
  for (let i = 0; i < 10; i++) {
    const username = getRandomName();
    users.push({ username });
  }

   // Add users and thoughts to the collection and await the results
  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});