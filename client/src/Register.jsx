import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  async function register(ev) {
    ev.preventDefault();
    axios.get("/test", { withCredentials: false });
    const { data } = await axios.post("/register", { username, password });
    setLoggedInUsername(username);
    setId(data.id);
  }

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700 h-screen flex items-center justify-center">
      <div className="w-[300px] h-[200px] bg-white shadow-lg rounded-lg flex items-center">
        <form className="w-64 mx-auto border-solid" onSubmit={register}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            className="block w-full rounded-sm p-2 mb-2 border outline-none"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="block w-full rounded-sm p-2 mb-2 border outline-none"
          />
          <button className="w-full bg-blue-500 text-white rounded-sm p-2">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
