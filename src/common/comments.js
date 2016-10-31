import Chance from 'chance';

const chance = new Chance();

export default {
  isLoading: true,
};

export function createComments({ results }) {
  return {
    comment: {
      isLoading: false,
    },

    userId: chance.natural(),

    settings: {
      maxLevel: 3,
      textLimit: 600,
      textExpendLimit: 140,
      isAdmin: true,
    },

    comments: generateComments(results),
  };
}

export const count = chance.natural({ min: 0, max: 8 });

export function generateComment(data) {
  return {
    id: chance.natural(),
    text: data.text || chance.paragraph(),
    createdAt: data.createdAt || new Date().getTime(),
    userId: data.userId || chance.natural(),
    userPic: data.userPic,
    email: data.email,
    displayName: data.name || 'Anonymous',
    level: data.level || 0,
    parentId: data.parentId,
    childrenCount: 0,
  };
}

function generateComments(data) {
  return Array.from(Array(count), (el, i) => {
    return generateComment({
      userPic: data[i].picture.thumbnail,
      email: data[i].email,
      name: capitalize(data[i].name.first) + ' ' + capitalize(data[i].name.last),
      createdAt: new Date(data[i].registered).getTime(),
    });
  });
}

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}
