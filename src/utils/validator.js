export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function isValidPassword(password) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

export const validatePasswordMatch = (password, checkPassword) => {
  return password === checkPassword;
};

export function isValidNickname(nickname) {
  const regex = /^[A-Za-z_]+$/;
  return regex.test(nickname);
}
