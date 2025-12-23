import React, { useEffect, useState } from "react";
import { db, Service } from "../../lib/database";

export default function ServicesPage({
  onNavigate,
}: {
  onNavigate?: (p: string) => void;
}) {
  const [services, setServices] = useState<Service[]>([]);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "general",
    short_description: "",
  });

  const load = () => setServices(db.getAllServices());

  useEffect(() => {
    load();
  }, []);

  const handleCreate = () => {
    const id = "service-" + Date.now();
    const newService: Service = {
      id,
      title: form.title,
      slug: form.slug || form.title.toLowerCase().replace(/\s+/g, "-"),
      category: form.category,
      description: form.short_description || form.title,
      short_description: form.short_description,
      created_at: new Date().toISOString(),
      display_order: services.length + 1,
    } as Service;
    db.createService(newService as any);
    setForm({
      title: "",
      slug: "",
      category: "general",
      short_description: "",
    });
    setCreating(false);
    load();
  };

  const remove = (id: string) => {
    if (!confirm("Delete service?")) return;
    db.deleteService(id);
    load();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Services</h2>
        <div>
          <button onClick={() => setCreating(!creating)} className="btn btn-sm">
            {creating ? "Cancel" : "Create service"}
          </button>
        </div>
      </div>

      {creating && (
        <div className="mb-4 p-4 bg-white rounded shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title"
              className="input"
            />
            <input
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="Slug"
              className="input"
            />
            <input
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="Category"
              className="input"
            />
            <input
              value={form.short_description}
              onChange={(e) =>
                setForm({ ...form, short_description: e.target.value })
              }
              placeholder="Short description"
              className="input"
            />
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
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2">Created</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-2">{s.title}</td>
                <td className="p-2">{s.category}</td>
                <td className="p-2">
                  {s.created_at
                    ? new Date(s.created_at).toLocaleDateString()
                    : "-"}
                </td>
                <td className="p-2">
                  <button
                    onClick={() =>
                      onNavigate && onNavigate(`/services/${s.slug}`)
                    }
                    className="btn btn-sm mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => remove(s.id)}
                    className="btn btn-sm text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
