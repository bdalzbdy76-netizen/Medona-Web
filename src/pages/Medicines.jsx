import { useEffect, useState } from "react";

import api from "../services/api";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import DataTable from "../components/ui/DataTable";


function Medicines() {


  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    getMedicines();

  }, []);




  async function getMedicines() {

    try {

      setLoading(true);


      const response = await api.get("/api/medicines");


      setMedicines(
        response.data?.data?.items || []
      );



    } catch (error) {


      console.log(
        "Medicines Error:",
        error.response?.data || error.message
      );


      setMedicines([]);



    } finally {


      setLoading(false);


    }

  }


  const columns = [
    { key: "id", title: "#" },
    { key: "name", title: "اسم الدواء", render: (m) => m.name || "-" },
    { key: "barcode", title: "الباركود", render: (m) => m.barcode || "-" },
    { key: "price", title: "السعر", render: (m) => m.price || "-" },
    {
      key: "isActive",
      title: "الحالة",
      render: (m) =>
        m.isActive ? (
          <Badge variant="success">فعال</Badge>
        ) : (
          <Badge variant="danger">غير فعال</Badge>
        ),
    },
  ];



  return (


    <div dir="rtl">

      <div className="page-header">

        <div>

          <h1 className="page-header__title">
            الأدوية
          </h1>

          <p className="page-header__subtitle">
            إدارة جميع الأدوية
          </p>

        </div>

        <Button onClick={getMedicines}>
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
          data={medicines}
          emptyMessage="لا توجد أدوية"
        />

      )}

    </div>

  );

}


export default Medicines;
