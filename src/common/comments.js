import Chance from 'chance';

const chance = new Chance();

export default {
  isLoading: true,
};

export function CreateComments({ results }) {
  return {
    userId: chance.natural(),
    settings: {
      maxLevel: 3,
      textLimit: 600,
      textExpendLimit: 140,
      isAdmin: true,
    },
    comment: {
      text: '',
      isLoading: false,
    },
    comments: create(results),
  };
}

CreateComments.count = chance.natural({ min: 0, max: 8 });

function create(data) {
  return Array.from(Array(CreateComments.count), (el, i) => {
    return new Comment({
      userPic: data[i].picture.thumbnail,
      email: data[i].email,
      name: capitalize(data[i].name.first) + ' ' + capitalize(data[i].name.last),
      createdAt: new Date(data[i].registered).getTime(),
    });
  });
}

function Comment(data) {
  const { userPic, email, name, createdAt } = data;
  return {
    id: chance.natural(),
    text: chance.paragraph(),
    createdAt: createdAt,
    parentId: chance.natural(),
    userId: chance.natural(),
    userPic,
    email,
    displayName: name,
    level: 1,
    childrenCount: 0,
  };
}

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}
