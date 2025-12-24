import React, { useEffect, useMemo, useState } from "react";
import { db } from "../../lib/database";
import { format } from "date-fns";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiX,
  FiUser,
  FiMail,
  FiUserCheck,
  FiUserX,
} from "react-icons/fi";

// Define the UserRole type based on the database schema
type UserRole = "admin" | "doctor" | "patient";

// Define the User interface with all required properties
interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

interface UserFilters {
  role: UserRole | "";
  status: "active" | "inactive" | "";
  dateFrom: string;
  dateTo: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<UserFilters>({
    role: "",
    status: "",
    dateFrom: "",
    dateTo: format(new Date(), "yyyy-MM-dd"),
  });

  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: "asc" | "desc";
  }>({
    key: "createdAt",
    direction: "desc",
  });

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<
    Omit<User, "id" | "createdAt" | "updatedAt">
  >({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    role: "patient",
    isActive: true,
  });

  const [editForm, setEditForm] = useState<
    Omit<User, "id" | "password" | "createdAt" | "updatedAt">
  >({
    email: "",
    fullName: "",
    phone: "",
    role: "patient",
    isActive: true,
  });

  // Load users
  useEffect(() => {
    const loadUsers = () => {
      try {
        setLoading(true);
        const dbUsers = db.getAllUsers();
        const allUsers = dbUsers.map((user) => {
          // Safely get the updatedAt property
          const updatedAt =
            "updatedAt" in user
              ? (user as unknown as { updatedAt?: string }).updatedAt
              : new Date().toISOString();

          return {
            id: user.id,
            email: user.email || "",
            password: user.password || "",
            fullName: user.fullName || "",
            phone: user.phone || "",
            role: (user.role as UserRole) || "patient",
            isActive: true, // Default value for existing users
            createdAt: user.createdAt || new Date().toISOString(),
            updatedAt: updatedAt || new Date().toISOString(),
          };
        });
        setUsers(allUsers);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Handle sorting
  const requestSort = (key: keyof User) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Apply filters and sorting
  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    // Apply search
    if (search) {
      const query = search.toLowerCase();
      result = result.filter(
        (user) =>
          user.email.toLowerCase().includes(query) ||
          user.fullName?.toLowerCase().includes(query) ||
          user.phone?.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.role) {
      result = result.filter((user) => user.role === filters.role);
    }

    if (filters.status) {
      const isActive = filters.status === "active";
      result = result.filter((user) => user.isActive === isActive);
    }

    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      result = result.filter((user) => {
        const userDate = user.createdAt
          ? new Date(user.createdAt)
          : new Date(0);
        return userDate >= fromDate;
      });
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999);
      result = result.filter((user) => {
        const userDate = user.createdAt
          ? new Date(user.createdAt)
          : new Date(0);
        return userDate <= toDate;
      });
    }

    // Apply sorting
    const { key, direction } = sortConfig;
    if (key) {
      result.sort((a, b) => {
        if (a[key] === b[key]) return 0;
        const compare = a[key] > b[key] ? 1 : -1;
        return direction === "asc" ? compare : -compare;
      });
    }

    return result;
  }, [users, search, filters, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedUsers.length / pageSize) || 1;
  const paginatedUsers = filteredAndSortedUsers.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, filters, sortConfig]);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, type } = target;
    const value = type === "checkbox" ? target.checked : target.value;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Handle edit form input changes
  const handleEditInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, type } = target;
    const value = type === "checkbox" ? target.checked : target.value;
    setEditForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Create new user
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone,
        role: formData.role,
        createdAt: new Date().toISOString(),
      };

      // Create the user in the database
      const createdUser = db.createUser(userData);

      // Update local state with the created user and additional fields
      setUsers((prevUsers) => [
        ...prevUsers,
        {
          ...createdUser,
          isActive: true,
          updatedAt: new Date().toISOString(),
        },
      ]);

      // Reset the form
      setFormData({
        email: "",
        password: "",
        fullName: "",
        phone: "",
        role: "patient",
        isActive: true,
      });
      setIsCreating(false);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Start editing user
  const startEdit = (user: User) => {
    setEditingId(user.id);
    setEditForm({
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
    });
  };

  // Save edited user
  const saveUser = (id: string) => {
    try {
      const { isActive, ...userData } = editForm;
      const updatedUser = db.updateUser(id, userData);

      if (updatedUser) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id
              ? {
                  ...updatedUser,
                  isActive,
                  updatedAt: new Date().toISOString(),
                }
              : user
          )
        );
        setEditingId(null);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete user
  const handleDeleteUser = (id: string) => {
    try {
      const success = db.deleteUser(id);
      if (success) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Toggle user status
  const toggleUserStatus = (id: string, currentStatus: boolean) => {
    try {
      const user = users.find((u) => u.id === id);
      if (!user) return;

      // Prepare user data for update (excluding isActive and updatedAt)
      const userData = {
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
      };

      // Update in database
      const updatedUser = db.updateUser(id, userData);

      // Update local state with the new status
      if (updatedUser) {
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.id === id
              ? {
                  ...updatedUser,
                  isActive: !currentStatus,
                  updatedAt: new Date().toISOString(),
                }
              : u
          )
        );
      }
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      role: "",
      status: "",
      dateFrom: "",
      dateTo: format(new Date(), "yyyy-MM-dd"),
    });
    setSearch("");
  };

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch {
      return "N/A";
    }
  };

  // Render role badge
  const renderRoleBadge = (role: string) => {
    const roleClasses = {
      admin: "bg-purple-100 text-purple-800",
      doctor: "bg-blue-100 text-blue-800",
      staff: "bg-green-100 text-green-800",
      patient: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          roleClasses[role as keyof typeof roleClasses] || "bg-gray-100"
        }`}
      >
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  // Render pagination buttons
  const renderPageButtons = () => {
    if (totalPages <= 1) return null;

    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + 4);
    const adjustedStart = Math.max(1, end - 4);

    // Use adjustedStart if needed to ensure we always show 5 page buttons when possible
    const displayStart = end - adjustedStart < 4 ? adjustedStart : start;

    const buttons = [] as React.ReactNode[];
    if (displayStart > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => setPage(1)}
          className={`btn btn-sm ${
            page === 1 ? "bg-slate-800 text-white" : ""
          }`}
        >
          1
        </button>
      );
      if (start > 2) {
        buttons.push(
          <span key="ellipsis-start" className="px-2">
            ...
          </span>
        );
      }
    }

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

    if (end < totalPages) {
      if (end < totalPages - 1) {
        buttons.push(
          <span key="ellipsis-end" className="px-2">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => setPage(totalPages)}
          className={`btn btn-sm ${
            page === totalPages ? "bg-slate-800 text-white" : ""
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search users by name or email"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="input pl-10"
            />
          </div>
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
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn btn-sm ${
              showFilters ? "bg-slate-800 text-white" : ""
            }`}
          >
            <FiFilter className="mr-1" />
            Filters
          </button>
        </div>
        <div>
          <button
            onClick={() => setIsCreating((c) => !c)}
            className="btn btn-sm btn-primary"
          >
            {isCreating ? (
              "Cancel"
            ) : (
              <>
                <FiPlus className="inline mr-1" />
                Create user
              </>
            )}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-4 p-4 bg-white rounded shadow">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                value={filters.role}
                onChange={(e) =>
                  setFilters({ ...filters, role: e.target.value as UserRole })
                }
                className="input w-full"
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
                <option value="staff">Staff</option>
                <option value="patient">Patient</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    status: e.target.value as "active" | "inactive" | "",
                  })
                }
                className="input w-full"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Date
              </label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) =>
                  setFilters({ ...filters, dateFrom: e.target.value })
                }
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Date
              </label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) =>
                  setFilters({ ...filters, dateTo: e.target.value })
                }
                className="input w-full"
              />
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <button onClick={resetFilters} className="btn btn-sm mr-2">
              <FiX className="inline mr-1" />
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {isCreating && (
        <div className="mb-4 p-4 bg-white rounded shadow">
          <h3 className="text-lg font-medium mb-3">Create New User</h3>
          <form onSubmit={handleCreateUser}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full name"
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="input"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex items-end">
                <div className="flex items-center">
                  <input
                    name="isActive"
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label
                    htmlFor="isActive"
                    className="text-sm font-medium text-gray-700"
                  >
                    Active
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <button type="submit" className="btn btn-primary">
                Create User
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded shadow overflow-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="p-2 text-left cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort("fullName")}
              >
                <div className="flex items-center">
                  Name
                  {sortConfig.key === "fullName" && (
                    <span className="ml-1">
                      {sortConfig.direction === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="p-2 text-left cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort("email")}
              >
                <div className="flex items-center">
                  Email
                  {sortConfig.key === "email" && (
                    <span className="ml-1">
                      {sortConfig.direction === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="p-2 text-center cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort("role")}
              >
                <div className="flex items-center justify-center">
                  Role
                  {sortConfig.key === "role" && (
                    <span className="ml-1">
                      {sortConfig.direction === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="p-2 text-center cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort("createdAt")}
              >
                <div className="flex items-center justify-center">
                  Created
                  {sortConfig.key === "createdAt" && (
                    <span className="ml-1">
                      {sortConfig.direction === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
              <th className="p-2 text-center">Status</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  Loading users...
                </td>
              </tr>
            ) : paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  No users found
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">
                    {editingId === user.id ? (
                      <input
                        name="fullName"
                        value={editForm.fullName}
                        onChange={handleEditInputChange}
                        className="input"
                      />
                    ) : (
                      <div className="flex items-center">
                        <FiUser className="mr-2 text-gray-400" />
                        {user.fullName || "N/A"}
                      </div>
                    )}
                  </td>
                  <td className="p-2">
                    {editingId === user.id ? (
                      <input
                        name="email"
                        value={editForm.email}
                        onChange={handleEditInputChange}
                        className="input"
                      />
                    ) : (
                      <div className="flex items-center">
                        <FiMail className="mr-2 text-gray-400" />
                        {user.email}
                      </div>
                    )}
                  </td>
                  <td className="p-2 text-center">
                    {editingId === user.id ? (
                      <select
                        name="role"
                        value={editForm.role}
                        onChange={handleEditInputChange}
                        className="input"
                      >
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      renderRoleBadge(user.role)
                    )}
                  </td>
                  <td className="p-2 text-center">
                    {formatDate(user.createdAt || "")}
                  </td>
                  <td className="p-2 text-center">
                    {editingId === user.id ? (
                      <div className="flex items-center justify-center">
                        <input
                          name="isActive"
                          type="checkbox"
                          checked={editForm.isActive}
                          onChange={handleEditInputChange}
                          className="mr-2"
                        />
                        <label htmlFor="isActive" className="text-sm">
                          {editForm.isActive ? "Active" : "Inactive"}
                        </label>
                      </div>
                    ) : (
                      <button
                        onClick={() => toggleUserStatus(user)}
                        className={`btn btn-sm ${
                          user.isActive ? "text-green-600" : "text-gray-400"
                        }`}
                      >
                        {user.isActive ? <FiUserCheck /> : <FiUserX />}
                      </button>
                    )}
                  </td>
                  <td className="p-2">
                    <div className="flex justify-center space-x-2">
                      {editingId === user.id ? (
                        <>
                          <button
                            onClick={() => saveUser(user.id)}
                            className="btn btn-sm btn-primary"
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
                            onClick={() => startEdit(user)}
                            className="btn btn-sm"
                            title="Edit"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="btn btn-sm text-red-600"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="p-3 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Page {page} of {totalPages} — {filteredAndSortedUsers.length} users
          </div>
          <div className="space-x-2 flex items-center">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="btn btn-sm"
            >
              <FiChevronLeft />
            </button>
            {renderPageButtons()}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="btn btn-sm"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
