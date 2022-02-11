function returnErrorMessage(errorCode: string) {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'User not found...';
    case 'auth/invalid-email':
      return 'Invalid email address...';
    case 'auth/email-already-exists':
      return 'Email already exists...';
    case 'auth/invalid-password':
      return 'Invalid password...';
    case 'reg/na':
      return 'Addrs not available...';
    case 'auth/email-already-in-use':
      return 'Email already in use...';
    default:
      return 'Unknown error...';
  }
}

export {
  returnErrorMessage,
};
