import "./App.css";
import { useEffect, useState } from "react";
import { firestore } from "./firebase";

function App() {
  const [user, setUser] = useState();
  //const [dailyEntries, setDailyEntries] = useState();

  useEffect(() => {
    const userId = new URLSearchParams(window.location.search).get("user");
    firestore
      .collection("users")
      .doc(userId)
      .get()
      .then((user) => {
        if (user.exists) {
          setUser(user.data());
        } else {
          console.log("error");
        }
      });
  }, []);

  return user != null ? (
    <div className="App">
      <h1>Health Dashboard</h1>
      <h2>General Info</h2>
      <div className="General-info">
        <div className="Profile">
          <h3>{user["name"]}</h3>
          <h4>
            {user["gender"]} | {user["age"]} years old
          </h4>
        </div>
        <div className="Profile-more">
          <h4>Height: {user["height"]} ft</h4>
          <h4>Weight: {user["weight"]} lbs</h4>
        </div>
      </div>
      <h2>Symptoms</h2>
      <div className="Symptoms">
        <div className="Symptoms-info">
          <h4>Fever</h4>
          <h4>Cough</h4>
          <h4>Congestion</h4>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default App;
