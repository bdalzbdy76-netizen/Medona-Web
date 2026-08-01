import { useEffect, useState } from "react";

import api from "../services/api";
import Button from "../components/ui/Button";
import DataTable from "../components/ui/DataTable";


function PharmacyCart() {


  const [cartProducts, setCartProducts] = useState([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    getCartProducts();

  }, []);




  async function getCartProducts() {


    try {


      setLoading(true);



const response = await api.get("/api/pharmacy-order-list-products");


      setCartProducts(

        response.data?.data?.items ||

        response.data?.data ||

        []

      );



    } catch (error) {


      console.log(

        "Pharmacy Cart Error:",

        error.response?.data || error.message

      );


      setCartProducts([]);



    } finally {


      setLoading(false);


    }


  }


  const columns = [
    { key: "id", title: "#" },
    {
      key: "medicine",
      title: "الدواء",
      render: (item) =>
        item.medicine?.name || item.medicineName || "-",
    },
    { key: "pharmacyCartId", title: "رقم السلة", render: (item) => item.pharmacyCartId || "-" },
    { key: "quantity", title: "الكمية", render: (item) => item.quantity || 0 },
  ];



  return (


    <div dir="rtl">

      <div className="page-header">

        <div>

          <h1 className="page-header__title">
            سلة الصيدلية
          </h1>

          <p className="page-header__subtitle">
            إدارة منتجات سلة الصيدلية
          </p>

        </div>

        <Button onClick={getCartProducts}>
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
          data={cartProducts}
          emptyMessage="لا يوجد منتجات في السلة"
        />

      )}

    </div>

  );

}



export default PharmacyCart;
