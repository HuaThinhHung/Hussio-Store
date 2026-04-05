export const userService = {
  async getUsers() {
    const response = await fetch('https://69d15bcd90cd06523d5e103e.mockapi.io/api/users');
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async getUserById(id) {
    const response = await fetch(`https://69d15bcd90cd06523d5e103e.mockapi.io/api/users/${id}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  },

  async createUser(data) {
    const userData = {
      ...data,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };
    const response = await fetch('https://69d15bcd90cd06523d5e103e.mockapi.io/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  },

  async updateUser(id, data) {
    const response = await fetch(`https://69d15bcd90cd06523d5e103e.mockapi.io/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
  },

  async deleteUser(id) {
    const response = await fetch(`https://69d15bcd90cd06523d5e103e.mockapi.io/api/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete user');
    return response.json();
  },
};
