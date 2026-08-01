import { useState } from "react";
import api from "../services/api";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import "../styles/pages/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      // حفظ التوكن
      localStorage.setItem(
        "token",
        response.data.data.token
      );

      // الانتقال للوحة التحكم
      window.location.href = "/dashboard";
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "فشل تسجيل الدخول"
      );

      console.log(error.response?.data);
    }
  }

  return (
    <div className="login-page" dir="rtl">
      <Card className="login-card">
        <form onSubmit={handleLogin} className="form-stack">
          <h1 className="login-card__title">
            تسجيل دخول ميدونا
          </h1>

          <Input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" fullWidth>
            تسجيل الدخول
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Login;
