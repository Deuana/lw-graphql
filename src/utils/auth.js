export const noAuth = () => {};
export const userLogged = (req) => {
  if (!req.jwt.payload.id) {
    throw new Error('401:User.UNAUTHORIZED');
  }
};
