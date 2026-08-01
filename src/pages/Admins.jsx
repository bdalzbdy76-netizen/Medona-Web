import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ActionButtons from "../components/ui/ActionButtons";
import api from "../services/api";

import DataTable from "../components/ui/DataTable";
import SearchInput from "../components/ui/SearchInput";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getAdmins();
  }, []);

  async function getAdmins() {
    try {
      const response = await api.get("/api/admins");

      setAdmins(response.data.data.items);

    } catch (error) {
      console.log(error.response?.data);
    }
  }

  function resetForm() {
    setName("");
    setEmail("");
    setPassword("");

    setSelectedAdminId(null);
    setIsEditing(false);

    setOpenModal(false);
  }

  function openCreateModal() {
    resetForm();

    setOpenModal(true);
  }

  function handleEdit(admin) {
    setIsEditing(true);

    setSelectedAdminId(admin.id);

    setName(admin.name);
    setEmail(admin.email);

    setPassword("");

    setOpenModal(true);
  }

  async function handleCreateAdmin() {

    if (!name.trim()) {
      alert("أدخل الاسم");
      return;
    }

    if (!email.trim()) {
      alert("أدخل البريد الإلكتروني");
      return;
    }

    if (password.length < 6) {
      alert("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    try {

      await api.post("/api/admins", {
        name,
        email,
        password,
      });

      resetForm();

      getAdmins();

      alert("تم إنشاء المشرف بنجاح");

    } catch (error) {

      alert(error.response?.data?.message);

      console.log(error.response?.data);

    }
  }

  async function handleUpdateAdmin() {

    try {

      const body = {
        name,
        email,
      };

      if (password.trim()) {
        body.password = password;
      }

      await api.patch(
        `/api/admins/${selectedAdminId}`,
        body
      );

      resetForm();

      getAdmins();

      alert("تم تعديل المشرف");

    } catch (error) {

      alert(error.response?.data?.message);

      console.log(error.response?.data);

    }
  }

  async function handleDelete(admin) {

    const ok = window.confirm(
      `هل تريد حذف ${admin.name} ؟`
    );

    if (!ok) return;

    try {

      await api.delete(
        `/api/admins/${admin.id}`
      );

      getAdmins();

      alert("تم الحذف");

    } catch (error) {

      alert(error.response?.data?.message);

      console.log(error.response?.data);

    }
  }

  const filteredAdmins = admins.filter((admin) => {

    return (

      admin.name
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      admin.email
        .toLowerCase()
        .includes(search.toLowerCase())

    );

  });


  const columns = [

    {
      key: "id",
      title: "ID",
    },

    {
      key: "name",
      title: "الاسم",
    },

    {
      key: "email",
      title: "البريد الإلكتروني",
    },

    {
      key: "actions",
      title: "الإجراءات",

      render: (admin) => (

        <ActionButtons
          onEdit={() => handleEdit(admin)}
          onDelete={() => handleDelete(admin)}
        />
      ),

    },

  ];

  return (

    <div dir="rtl">

      <div className="page-header">

        <div>

          <h1 className="page-header__title">
            إدارة المشرفين
          </h1>

          <p className="page-header__subtitle">
            جميع المشرفين في النظام
          </p>

        </div>

        <Button onClick={openCreateModal}>
          <Plus size={18} />
          إضافة مشرف
        </Button>

      </div>

      <div className="toolbar">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث عن مشرف..."
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredAdmins}
        emptyMessage="لا يوجد مشرفون"
      />

      <Modal
        open={openModal}
        title={
          isEditing
            ? "تعديل مشرف"
            : "إضافة مشرف"
        }
        onClose={resetForm}
      >

        <div className="form-stack">

          <Input
            label="الاسم"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="البريد الإلكتروني"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label={
              isEditing
                ? "كلمة المرور الجديدة (اختياري)"
                : "كلمة المرور"
            }
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            onClick={
              isEditing
                ? handleUpdateAdmin
                : handleCreateAdmin
            }
          >
            {
              isEditing
                ? "حفظ التعديلات"
                : "إضافة المشرف"
            }
          </Button>

        </div>

      </Modal>

    </div>

  );

}

export default Admins;
