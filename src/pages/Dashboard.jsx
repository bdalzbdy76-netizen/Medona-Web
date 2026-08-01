import { useEffect, useState } from "react";
import api from "../services/api";
import StatCard from "../components/ui/StatCard";
import "../styles/pages/dashboard.css";

function Dashboard() {

  const [stats, setStats] = useState({
    admins: 0,
    pharmacies: 0,
    medicines: 0,
    orders: 0,
  });


  async function getStats() {

    try {

     const [
  adminsResponse,
  pharmaciesResponse,
  medicinesResponse
] = await Promise.all([
  api.get("/api/admins"),
  api.get("/api/pharmacies"),
  api.get("/api/medicines"),
]);


      setStats({
        admins: adminsResponse.data.data?.total || 0,
        pharmacies: pharmaciesResponse.data.data?.total || 0,
        medicines: medicinesResponse.data.data?.total || 0,
        orders: 0,
      });


    } catch (error) {

      console.log(error.response?.data);

    }

  }


  useEffect(() => {
    getStats();
  }, []);


  const cards = [
    {
      title: "عدد المشرفين",
      value: stats.admins,
    },
    {
      title: "عدد الصيدليات",
      value: stats.pharmacies,
    },
    {
      title: "عدد الأدوية",
      value: stats.medicines,
    },
    {
      title: "عدد الطلبات",
      value: stats.orders,
    },
  ];


  return (

    <div>

      <div className="page-header">
        <div>
          <h1 className="page-header__title">
            لوحة التحكم
          </h1>

          <p className="page-header__subtitle">
            أهلاً بك في نظام Medona
          </p>
        </div>
      </div>

      <div className="stats-grid">

        {cards.map((card) => (

          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
          />

        ))}

      </div>


    </div>

  );

}


export default Dashboard;
