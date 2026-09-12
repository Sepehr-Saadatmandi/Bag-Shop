import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: Address[];
  defaultAddress?: number;
  createdAt: string;
}

export interface Address {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

interface UserContextType {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => boolean;
  register: (userData: RegisterData) => boolean;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (index: number, address: Address) => void;
  removeAddress: (index: number) => void;
  setDefaultAddress: (index: number) => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Load users from localStorage
    const savedUsers = localStorage.getItem('shop_users');
    const savedCurrentUser = localStorage.getItem('shop_currentUser');
    
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
    if (savedCurrentUser) {
      setUser(JSON.parse(savedCurrentUser));
    }
  }, []);

  const saveUsers = (newUsers: User[]) => {
    setUsers(newUsers);
    localStorage.setItem('shop_users', JSON.stringify(newUsers));
  };

  const login = (email: string, password: string): boolean => {
    // Check if user exists
    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex === -1) return false;

    // Verify password (in real app, this would be hashed)
    const storedPassword = localStorage.getItem(`shop_password_${email}`);
    if (storedPassword !== password) return false;

    setUser(users[userIndex]);
    localStorage.setItem('shop_currentUser', JSON.stringify(users[userIndex]));
    return true;
  };

  const register = (userData: RegisterData): boolean => {
    // Check if email already exists
    if (users.find(u => u.email === userData.email)) {
      return false;
    }

    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      addresses: [],
      createdAt: new Date().toISOString(),
    };

    // Save user and password
    const newUsers = [...users, newUser];
    saveUsers(newUsers);
    localStorage.setItem(`shop_password_${userData.email}`, userData.password);

    // Auto-login
    setUser(newUser);
    localStorage.setItem('shop_currentUser', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shop_currentUser');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('shop_currentUser', JSON.stringify(updatedUser));

    // Update in users array
    const newUsers = users.map(u => u.id === user.id ? updatedUser : u);
    saveUsers(newUsers);
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    if (!user) return;

    const newAddress: Address = {
      ...address,
      id: `addr_${Date.now()}`,
    };

    const updatedUser = {
      ...user,
      addresses: [...user.addresses, newAddress],
      defaultAddress: user.addresses.length === 0 ? 0 : user.defaultAddress,
    };

    setUser(updatedUser);
    localStorage.setItem('shop_currentUser', JSON.stringify(updatedUser));

    const newUsers = users.map(u => u.id === user.id ? updatedUser : u);
    saveUsers(newUsers);
  };

  const updateAddress = (index: number, address: Address) => {
    if (!user) return;

    const newAddresses = [...user.addresses];
    newAddresses[index] = address;

    const updatedUser = { ...user, addresses: newAddresses };
    setUser(updatedUser);
    localStorage.setItem('shop_currentUser', JSON.stringify(updatedUser));

    const newUsers = users.map(u => u.id === user.id ? updatedUser : u);
    saveUsers(newUsers);
  };

  const removeAddress = (index: number) => {
    if (!user) return;

    const newAddresses = user.addresses.filter((_, i) => i !== index);
    const updatedUser = {
      ...user,
      addresses: newAddresses,
      defaultAddress: user.defaultAddress === index ? 0 : user.defaultAddress,
    };

    setUser(updatedUser);
    localStorage.setItem('shop_currentUser', JSON.stringify(updatedUser));

    const newUsers = users.map(u => u.id === user.id ? updatedUser : u);
    saveUsers(newUsers);
  };

  const setDefaultAddress = (index: number) => {
    if (!user) return;

    const updatedUser = { ...user, defaultAddress: index };
    setUser(updatedUser);
    localStorage.setItem('shop_currentUser', JSON.stringify(updatedUser));

    const newUsers = users.map(u => u.id === user.id ? updatedUser : u);
    saveUsers(newUsers);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        updateAddress,
        removeAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
