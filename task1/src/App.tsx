import { useState } from "react";
import { USERS } from "@/data/users";
import type { User } from "@/types/user";
import UserList from "@/components/UserList";
import AddUserModal from "@/components/AddUserModal";


function App() {
  const [users, setUsers] = useState<User[]>(USERS);

  const addUser = (user: User) => {
    setUsers(prev => [...prev, user]);
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>

      <AddUserModal onAdd={addUser} />
      <UserList users={users} />
    </main>
  );
}

export default App