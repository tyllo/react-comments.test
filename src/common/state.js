const comments = {
  isLoading: false,
  settings: {},
  maxLevel: 3,
  textLimit: 140,
  userId: Number,
  comments: [
    {
      id: Number,
      text: String,
      createdAt: Number,
      parentId: Number,
      userId: Number,
      userImage: String,
      displayName: String,
      level: Number,
      childrenCount: Number,
    },
  ],
};

export function getDefaultState() {
  return {
    comments,
  };
}
