import React, { useEffect, useMemo, useState } from "react";
import { db, User } from "../../lib/database";

// Clean single-definition Users admin page
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    role: "patient",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    fullName: "",
    phone: "",
    role: "patient",
  });

  const load = () => setUsers(db.getAllUsers());

  useEffect(() => {
    load();
  }, []);

  const handleCreate = () => {
    try {
      db.createUser({
        email: form.email,
        password: form.password,
        fullName: form.fullName,
        phone: form.phone,
        role: form.role as any,
      } as any);
      setForm({
        email: "",
        password: "",
        fullName: "",
        phone: "",
        role: "patient",
      });
      setCreating(false);
      load();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (u: User) => {
    setEditingId(u.id);
    setEditForm({
      fullName: u.fullName,
      phone: u.phone,
      role: (u.role as string) || "patient",
    });
  };
  const saveEdit = (id: string) => {
    db.updateUser(id, {
      fullName: editForm.fullName,
      phone: editForm.phone,
      role: editForm.role as any,
    });
    setEditingId(null);
    load();
  };
  const remove = (id: string) => {
    if (!confirm("Delete user? This cannot be undone.")) return;
    db.deleteUser(id);
    load();
  };

  const q = search.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      users.filter(
        (u) =>
          !q ||
          u.fullName.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          (u.phone || "").toLowerCase().includes(q)
      ),
    [users, q]
  );
  const computedTotalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => {
    if (page > computedTotalPages) setPage(computedTotalPages);
  }, [computedTotalPages, page]);
  const startIndex = (page - 1) * pageSize;
  const pageItems = filtered.slice(startIndex, startIndex + pageSize);

  const renderPageButtons = () => {
    const maxButtons = 7;
    let start = Math.max(1, page - Math.floor(maxButtons / 2));
    let end = Math.min(computedTotalPages, start + maxButtons - 1);
    if (end - start + 1 < maxButtons) start = Math.max(1, end - maxButtons + 1);
    const buttons = [] as React.ReactNode[];
    for (let p = start; p <= end; p++) {
      buttons.push(
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`btn btn-sm ${
            p === page ? "bg-slate-800 text-white" : ""
          }`}
        >
          {p}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <div className="flex items-center space-x-2">
          <input
            placeholder="Search users by name or email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="input"
          />
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="input w-28"
          >
            <option value={5}>5 / page</option>
            <option value={10}>10 / page</option>
            <option value={25}>25 / page</option>
          </select>
        </div>
        <div>
          <button onClick={() => setCreating((c) => !c)} className="btn btn-sm">
            {creating ? "Cancel" : "Create user"}
          </button>
        </div>
      </div>

      {creating && (
        <div className="mb-4 p-4 bg-white rounded shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <input
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder="Full name"
              className="input"
            />
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="input"
            />
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone"
              className="input"
            />
            <input
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Password"
              className="input"
            />
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="input"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
            <div>
              <button onClick={handleCreate} className="btn btn-primary">
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded shadow overflow-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Created</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-2">
                  {editingId === u.id ? (
                    <input
                      value={editForm.fullName}
                      onChange={(e) =>
                        setEditForm({ ...editForm, fullName: e.target.value })
                      }
                      className="input"
                    />
                  ) : (
                    u.fullName
                  )}
                </td>
                <td className="p-2">{u.email}</td>
                <td className="p-2 text-center">
                  {editingId === u.id ? (
                    <select
                      value={editForm.role}
                      onChange={(e) =>
                        setEditForm({ ...editForm, role: e.target.value })
                      }
                      className="input"
                    >
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    u.role
                  )}
                </td>
                <td className="p-2">
                  {new Date(
                    (u as any).createdAt || (u as any).created_at || Date.now()
                  ).toLocaleDateString()}
                </td>
                <td className="p-2">
                  {editingId === u.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(u.id)}
                        className="btn btn-sm btn-primary mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="btn btn-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(u)}
                        className="btn btn-sm mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => remove(u.id)}
                        className="btn btn-sm text-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-3 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Page {page} of {computedTotalPages} — {filtered.length} users
          </div>
          <div className="space-x-2 flex items-center">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="btn btn-sm"
            >
              Prev
            </button>
            {renderPageButtons()}
            <button
              onClick={() =>
                setPage((p) => Math.min(computedTotalPages, p + 1))
              }
              disabled={page >= computedTotalPages}
              className="btn btn-sm"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
