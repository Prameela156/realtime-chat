import { useState } from "react";
import { signIn, auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Chat from "./Chat";

export default function App() {
  const [user, setUser] = useState<any>(null);

  onAuthStateChanged(auth, (u) => setUser(u));

  return (
    <div>
      {!user ? (
        <button onClick={signIn}>Login with Google</button>
      ) : (
        <Chat user={user} />
      )}
    </div>
  );
}