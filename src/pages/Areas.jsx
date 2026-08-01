import { useEffect, useState } from "react";
import ActionButtons from "../components/ui/ActionButtons";
import api from "../services/api";
import Card from "../components/ui/Card";
import SearchInput from "../components/ui/SearchInput";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import DataTable from "../components/ui/DataTable";
import "../styles/pages/areas.css";

function Areas() {
  const [areas, setAreas] = useState([]);
  const [cities, setCities] = useState([]);

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [cityId, setCityId] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [selectedAreaId, setSelectedAreaId] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    getAreas();
    getCities();
  }, []);

  async function getAreas() {
    try {
      setLoading(true);

      const response = await api.get("/api/areas");

      setAreas(response.data.data.items);
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  }

  async function getCities() {
    try {
      const response = await api.get("/api/cities");
      setCities(response.data.data.items);
    } catch (error) {
      console.log(error.response?.data);
    }
  }

  function resetForm() {
    setName("");
    setCityId("");
    setIsEditing(false);
    setSelectedAreaId(null);
  }

  async function createArea() {
    if (!name.trim()) {
      alert("أدخل اسم المنطقة");
      return;
    }

    if (!cityId) {
      alert("اختر المدينة");
      return;
    }

    try {
      await api.post("/api/areas", {
        name,
        cityId: Number(cityId),
      });

      resetForm();
      getAreas();

      alert("تمت إضافة المنطقة");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  }

  function handleEdit(area) {
    setIsEditing(true);

    setSelectedAreaId(area.id);

    setName(area.name);

    setCityId(area.cityId.toString());
  }

  async function updateArea() {
    try {
      await api.patch(`/api/areas/${selectedAreaId}`, {
        name,
        cityId: Number(cityId),
      });

      resetForm();

      getAreas();

      alert("تم تعديل المنطقة");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  }

  async function deleteArea(area) {
    const ok = window.confirm(
      `هل تريد حذف المنطقة "${area.name}" ؟`
    );

    if (!ok) return;

    try {
      await api.delete(`/api/areas/${area.id}`);

      getAreas();

      alert("تم حذف المنطقة");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  }

  const filteredAreas = areas.filter((area) => {
    const city =
      cities.find((c) => c.id === area.cityId)?.name || "";

    return (
      area.name.toLowerCase().includes(search.toLowerCase()) ||
      city.toLowerCase().includes(search.toLowerCase())
    );
  });

  function handleSubmit() {
    if (isEditing) {
      updateArea();
    } else {
      createArea();
    }
  }

  const columns = [
    { key: "id", title: "#" },
    { key: "name", title: "المنطقة" },
    {
      key: "city",
      title: "المدينة",
      render: (area) =>
        cities.find((c) => c.id === area.cityId)?.name || "-",
    },
    {
      key: "actions",
      title: "الإجراءات",
      render: (area) => (
        <ActionButtons
          onEdit={() => handleEdit(area)}
          onDelete={() => deleteArea(area)}
        />
      ),
    },
  ];

  return (
    <div dir="rtl">

      <div className="page-header">

        <div>

          <h1 className="page-header__title">
            المناطق
          </h1>

          <p className="page-header__subtitle">
            إدارة المناطق
          </p>

        </div>

        <Button onClick={getAreas}>
          تحديث
        </Button>

      </div>

      <div className="toolbar">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث عن منطقة أو مدينة..."
        />
      </div>

      <Card className="toolbar">

        <h2 className="areas-form-title">
          {isEditing ? "تعديل منطقة" : "إضافة منطقة"}
        </h2>

        <div className="areas-form-grid">

          <Input
            placeholder="اسم المنطقة"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            className="form-field__select"
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
          >

            <option value="">
              اختر المدينة
            </option>

            {cities.map((city) => (

              <option
                key={city.id}
                value={city.id}
              >
                {city.name}
              </option>

            ))}

          </select>

        </div>

        <div className="areas-form-actions">

          <Button onClick={handleSubmit}>
            {isEditing ? "حفظ التعديلات" : "إضافة"}
          </Button>

          {isEditing && (
            <Button variant="secondary" onClick={resetForm}>
              إلغاء
            </Button>
          )}

        </div>

      </Card>

      {loading ? (

        <p className="data-table__empty">
          جاري تحميل البيانات...
        </p>

      ) : (

        <DataTable
          columns={columns}
          data={filteredAreas}
          emptyMessage="لا توجد مناطق"
        />

      )}

    </div>
  );
}

export default Areas;
