import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ActionButtons from "../components/ui/ActionButtons";
import api from "../services/api";

import SearchInput from "../components/ui/SearchInput";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import DataTable from "../components/ui/DataTable";

function Cities() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState(null);

  const [name, setName] = useState("");

  useEffect(() => {
    getCities();
  }, []);

  async function getCities() {
    try {
      setLoading(true);

      const response = await api.get("/api/cities");

      setCities(response.data.data.items);
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setName("");
    setIsEditing(false);
    setSelectedCityId(null);
    setOpenModal(false);
  }

  function openCreateModal() {
    resetForm();
    setOpenModal(true);
  }

  function handleEdit(city) {
    setIsEditing(true);
    setSelectedCityId(city.id);
    setName(city.name);
    setOpenModal(true);
  }

  async function handleCreateCity() {
    if (!name.trim()) {
      alert("أدخل اسم المدينة");
      return;
    }

    try {
      await api.post("/api/cities", {
        name,
      });

      resetForm();
      getCities();

      alert("تمت إضافة المدينة");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  }

  async function handleUpdateCity() {
    if (!name.trim()) {
      alert("أدخل اسم المدينة");
      return;
    }

    try {
      await api.patch(`/api/cities/${selectedCityId}`, {
        name,
      });

      resetForm();
      getCities();

      alert("تم تعديل المدينة");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  }

  async function handleDelete(city) {
    const ok = window.confirm(
      `هل تريد حذف "${city.name}" ؟`
    );

    if (!ok) return;

    try {
      await api.delete(`/api/cities/${city.id}`);

      getCities();

      alert("تم حذف المدينة");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  }

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: "id", title: "#" },
    { key: "name", title: "اسم المدينة" },
    {
      key: "actions",
      title: "الإجراءات",
      render: (city) => (
        <ActionButtons
          onEdit={() => handleEdit(city)}
          onDelete={() => handleDelete(city)}
        />
      ),
    },
  ];

  return (
    <div dir="rtl">

      <div className="page-header">

        <div>

          <h1 className="page-header__title">
            المدن
          </h1>

          <p className="page-header__subtitle">
            إدارة المدن
          </p>

        </div>

        <Button onClick={openCreateModal}>
          <Plus size={18} />
          إضافة مدينة
        </Button>

      </div>

      <div className="toolbar">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث عن مدينة..."
        />
      </div>

      {loading ? (

        <p className="data-table__empty">
          جاري التحميل...
        </p>

      ) : (

        <DataTable
          columns={columns}
          data={filteredCities}
          emptyMessage="لا توجد مدن"
        />

      )}

      <Modal
        open={openModal}
        onClose={resetForm}
        title={
          isEditing
            ? "تعديل مدينة"
            : "إضافة مدينة"
        }
      >

        <div className="form-stack">

          <Input
            label="اسم المدينة"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button
            fullWidth
            onClick={
              isEditing
                ? handleUpdateCity
                : handleCreateCity
            }
          >
            {
              isEditing
                ? "حفظ التعديلات"
                : "إضافة المدينة"
            }
          </Button>

        </div>

      </Modal>

    </div>
  );
}

export default Cities;
