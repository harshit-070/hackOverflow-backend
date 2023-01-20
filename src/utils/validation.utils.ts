export const isStrongPassword = (password: string) => {
  return password.match(
    /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/
  );
};
