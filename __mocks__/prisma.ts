export const PrismaClient = jest.fn().mockImplementation(() => {
  return {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
});