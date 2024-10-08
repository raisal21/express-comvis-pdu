interface User {
    id: string;
    name: string;
  }
  
  const users: User[] = [];
  
  // Service untuk menemukan user berdasarkan ID
  export const findUserById = (id: string) => {
    return users.find(user => user.id === id);
  };
  
  // Service untuk menambah user
  export const addUser = (userData: User) => {
    users.push(userData);
    return userData;
  };
  