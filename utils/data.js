const usernames = [
  'glowingstarfish',
  'happypenguin',
  'coolcat',
  'funkycheetah',
  'luckyowl',
  'sillymonkey',
  'colorfulparrot',
  'jollygiraffe',
  'bravekoala',
  'bouncykangaroo'
];

const thoughtsBodies = [
  'This is a tweet.',
  'Another tweet.',
  'RT if you agree!',
  'I can\'t believe this just happened.',
  'This is big news.',
  'New blog post alert!',
  'Just published a new video!',
  'I have some exciting news to share!',
  'I\'m working on a new project.',
  'Stay tuned for updates!',
];

const possibleReactions = [
  'Wow, I never thought of it that way!',
  'Thank you for sharing this.',
  'You\'ve given me something to think about.',
  'Keep up the great work!',
  'I\'m not sure how I feel about this.', 
  'This is really thought-provoking.',
  'I completely agree with you.',
  'You\'re changing the game!',
  'I\'m learning so much from your tweets.',
  'I appreciate your perspective.',
];

const users = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const getRandomName = () =>
  `${getRandomArrItem(usernames)}`;

// Function to generate random thoughts that we can add to the database. Includes reactions.
const getRandomThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughtsBodies),
      reactions: [...getRandomReactions(3)],
    });
  }
  return results;
};

// Create the reactions that will be added to each thought
const getRandomReactions = (int) => {
  if (int === 1) {
    return getRandomArrItem(possibleReactions);
  }
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      responseBody: getRandomArrItem(possibleReactions),
      username: getRandomName(),
    });
  }
  return results;
};

module.exports = { getRandomName, getRandomThoughts, getRandomReactions };