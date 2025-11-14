import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handle = (e) => {
    e.preventDefault();
    const ok = login(username, password);
    if (ok) {
      navigate("/admin");
    } else {
      setErr("Credenciales incorrectas");
    }
  };

  return (
    <div className="container" style={{ maxWidth:420 }}>
      <h3 className="mt-4">Ingresar</h3>
      {err && <div className="alert alert-danger">{err}</div>}
      <form onSubmit={handle}>
        <input className="form-control mb-2" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" className="form-control mb-2" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  );
}
