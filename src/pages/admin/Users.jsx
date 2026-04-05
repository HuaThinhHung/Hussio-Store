import { useState, useEffect, useMemo } from "react";
import { userService } from "../../services/userService";
import { useToast, ToastContainer } from "../../components/admin/Toast";
import LoadingSpinner from "../../components/admin/LoadingSpinner";

const ROLES = {
  admin: { label: "Quản trị viên", color: "bg-red-100 text-red-800" },
  manager: { label: "Quản lý", color: "bg-purple-100 text-purple-800" },
  customer: { label: "Khách hàng", color: "bg-blue-100 text-blue-800" },
};

function formatDate(dateString) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

// ── Mobile user card ─────────────────────────────────────────────────────────
function MobileUserCard({ user, onEdit, onDelete }) {
  const role = ROLES[user.role] || { label: user.role, color: "bg-gray-100 text-gray-800" };
  return (
    <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/40 transition-colors">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 flex-shrink-0">
        {user.name?.charAt(0)?.toUpperCase() || "U"}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
          <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${role.color} flex-shrink-0`}>
            {role.label}
          </span>
        </div>
        <p className="text-[10px] text-gray-400 truncate mt-0.5">{user.email}</p>
        <p className="text-[10px] text-gray-400 mt-0.5">{formatDate(user.createAt)}</p>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        <button onClick={() => onEdit(user)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Sửa">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button onClick={() => onDelete(user.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── User Modal (Add / Edit) ─────────────────────────────────────────────────
function UserModal({ isEdit, user, formData, setFormData, onClose, onSubmit, isSubmitting }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[90vh] w-full sm:max-w-md overflow-y-auto">
        {/* Drag handle */}
        <div className="w-8 h-1 rounded-full bg-gray-300 mx-auto mt-3 mb-0 sm:hidden" />
        <div className="sticky top-0 bg-white px-5 pt-4 pb-3 sm:px-8 sm:pt-6 sm:pb-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900">
            {isEdit ? "Sửa tài khoản" : "Thêm tài khoản"}
          </h3>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={onSubmit} className="px-5 py-5 sm:px-8 sm:py-6 space-y-4">
          {[
            { label: "Tên *", key: "name", type: "text", required: true, placeholder: "Nguyễn Văn A" },
            { label: "Email *", key: "email", type: "email", required: true, placeholder: "email@example.com" },
            { label: "Số điện thoại", key: "phone", type: "tel", required: false, placeholder: "0912 345 678" },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
              <input
                type={field.type}
                value={formData[field.key]}
                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                required={field.required}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Vai trò</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-white text-sm"
            >
              {Object.entries(ROLES).map(([key, v]) => (
                <option key={key} value={key}>{v.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Địa chỉ</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={2}
              placeholder="123 Đường ABC, Quận 1, TP.HCM"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none text-sm"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Đang lưu...
                </>
              ) : isEdit ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { toast, showToast, hideToast } = useToast();

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", role: "customer", address: "",
  });

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
    } catch {
      showToast("Không thể tải danh sách tài khoản", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await userService.createUser(formData);
      showToast("Thêm tài khoản thành công", "success");
      setIsAddModalOpen(false);
      resetForm();
      fetchUsers();
    } catch {
      showToast("Không thể thêm tài khoản", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await userService.updateUser(selectedUser.id, formData);
      showToast("Cập nhật tài khoản thành công", "success");
      setIsEditModalOpen(false);
      setSelectedUser(null);
      resetForm();
      fetchUsers();
    } catch {
      showToast("Không thể cập nhật tài khoản", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Bạn có chắc muốn xóa tài khoản này?")) {
      try {
        await userService.deleteUser(userId);
        showToast("Xóa tài khoản thành công", "success");
        fetchUsers();
      } catch {
        showToast("Không thể xóa tài khoản", "error");
      }
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      role: user.role || "customer",
      address: user.address || "",
    });
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", role: "customer", address: "" });
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.includes(searchTerm);
      const matchesRole = !roleFilter || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Đang tải tài khoản..." />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <ToastContainer toast={toast} onClose={hideToast} />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-black">Quản lý tài khoản</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">{filteredUsers.length} tài khoản</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsAddModalOpen(true); }}
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Thêm tài khoản
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <svg className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, SĐT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="sm:w-52 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-white text-sm"
          >
            <option value="">Tất cả vai trò</option>
            {Object.entries(ROLES).map(([key, v]) => (
              <option key={key} value={key}>{v.label}</option>
            ))}
          </select>
          {(searchTerm || roleFilter) && (
            <button
              onClick={() => { setSearchTerm(""); setRoleFilter(""); }}
              className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors whitespace-nowrap"
            >
              Xóa lọc
            </button>
          )}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 lg:px-6 py-3.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Người dùng</th>
                <th className="px-4 lg:px-6 py-3.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 lg:px-6 py-3.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">SĐT</th>
                <th className="px-4 lg:px-6 py-3.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Vai trò</th>
                <th className="px-4 lg:px-6 py-3.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Ngày tạo</th>
                <th className="px-4 lg:px-6 py-3.5 text-right text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-400">Không có tài khoản nào</td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const role = ROLES[user.role] || { label: user.role, color: "bg-gray-100 text-gray-800" };
                  return (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500 flex-shrink-0">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                          <span className="font-medium text-gray-900 text-sm">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <span className="text-sm text-gray-600">{user.email}</span>
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <span className="text-sm text-gray-600">{user.phone || "—"}</span>
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${role.color}`}>
                          {role.label}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <span className="text-sm text-gray-500">{formatDate(user.createAt)}</span>
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button onClick={() => openEditModal(user)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Sửa">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button onClick={() => handleDeleteUser(user.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
        {filteredUsers.length === 0 ? (
          <div className="px-4 py-12 text-center text-sm text-gray-400">Không có tài khoản nào</div>
        ) : (
          filteredUsers.map((user) => (
            <MobileUserCard
              key={user.id}
              user={user}
              onEdit={openEditModal}
              onDelete={handleDeleteUser}
            />
          ))
        )}
      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <UserModal
          isEdit={false}
          user={null}
          formData={formData}
          setFormData={setFormData}
          onClose={() => { setIsAddModalOpen(false); resetForm(); }}
          onSubmit={handleAddUser}
          isSubmitting={isSubmitting}
        />
      )}
      {isEditModalOpen && selectedUser && (
        <UserModal
          isEdit={true}
          user={selectedUser}
          formData={formData}
          setFormData={setFormData}
          onClose={() => { setIsEditModalOpen(false); setSelectedUser(null); resetForm(); }}
          onSubmit={handleUpdateUser}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
