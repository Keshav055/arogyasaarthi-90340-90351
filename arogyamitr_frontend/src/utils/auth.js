export function validateEmail(email) {
  // Simple email regex for basic validation
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(password) {
  // Require min 6 chars, can expand with more rules
  return typeof password === "string" && password.length >= 6;
}
