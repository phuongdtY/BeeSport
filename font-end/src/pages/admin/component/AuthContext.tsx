
class AuthService {
  
  getCurrentUser(value : string) {
    const userStr = localStorage.getItem(value);
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();