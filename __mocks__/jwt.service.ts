export const JwtService = {
    sign: jest.fn().mockReturnValue('mockJwtToken'),
    verify: jest.fn(),
    decode: jest.fn(),
  };
  