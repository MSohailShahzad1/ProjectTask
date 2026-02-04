import { useState } from "react";
import { Users } from "@/data/users";
import type { User } from "@/types/user";
import UserList from "@/components/UserList";
import UserFormDialog from "@/components/UserFormDialog";

function App() {
  const [users, setUsers] = useState<User[]>(Users);

  const addUser = (user: User) => {
    setUsers(prev => [...prev, user]);
  };

  const editUser = (updated: User) => {
    setUsers(prev =>
      prev.map(u => (u.id === updated.id ? updated : u))
    );
  };


  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>

      <UserFormDialog
        triggerLabel="Add User"
        onSave={addUser}
      />

      <UserList users={users} onEdit={editUser} />
    </main>
  );
}

export default App