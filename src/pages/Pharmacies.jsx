import { useEffect, useState } from "react";

import api from "../services/api";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import DataTable from "../components/ui/DataTable";


function Pharmacies() {

  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    getPharmacies();

  }, []);



  async function getPharmacies() {

    try {

      setLoading(true);


      const response = await api.get("/api/pharmacies");


      setPharmacies(
        response.data?.data?.items || []
      );



    } catch (error) {


      console.log(
        "Pharmacies Error:",
        error.response?.data || error.message
      );


      setPharmacies([]);


    } finally {


      setLoading(false);


    }

  }


  const columns = [
    { key: "id", title: "#" },
    { key: "name", title: "اسم الصيدلية", render: (p) => p.name || "-" },
    { key: "pharmacistName", title: "الصيدلي", render: (p) => p.pharmacistName || "-" },
    { key: "phone", title: "الهاتف", render: (p) => p.phone || "-" },
    { key: "email", title: "البريد", render: (p) => p.email || "-" },
    {
      key: "isActive",
      title: "الحالة",
      render: (p) =>
        p.isActive ? (
          <Badge variant="success">مفعلة</Badge>
        ) : (
          <Badge variant="danger">غير مفعلة</Badge>
        ),
    },
  ];


  return (

    <div dir="rtl">

      <div className="page-header">

        <div>

          <h1 className="page-header__title">
            الصيدليات
          </h1>

          <p className="page-header__subtitle">
            إدارة جميع الصيدليات
          </p>

        </div>

        <Button onClick={getPharmacies}>
          تحديث
        </Button>

      </div>

      {loading ? (

        <p className="data-table__empty">
          جاري تحميل البيانات...
        </p>

      ) : (

        <DataTable
          columns={columns}
          data={pharmacies}
          emptyMessage="لا يوجد صيدليات"
        />

      )}

    </div>

  );

}


export default Pharmacies;
