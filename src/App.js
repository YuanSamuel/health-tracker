import "./App.css";
import { useEffect, useState } from "react";
import { firestore } from "./firebase";
import firebase from "firebase/app";

function App() {
  const [user, setUser] = useState();
  const [dailyEntries, setDailyEntries] = useState();

  useEffect(() => {
    const userId = new URLSearchParams(window.location.search).get("user");
    firestore
      .collection("users")
      .doc(userId)
      .get()
      .then((user) => {
        if (user.exists) {
          setUser(user.data());
          firestore
            .collection("dailyEntries")
            .where(
              firebase.firestore.FieldPath.documentId(),
              "in",
              user.data()["dailyEntries"]
            )
            .get()
            .then((entries) => {
              console.log(entries);
              setDailyEntries(entries.docs);
            });
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
          <h4>Height: {user["height"]} cm</h4>
          <h4>Weight: {user["weight"]} kg</h4>
        </div>
      </div>
      <h2>Log</h2>
      <div className="Log">
        {dailyEntries != null ? <LogList docs={dailyEntries} /> : <div></div>}
      </div>
    </div>
  ) : (
    <div></div>
  );
}

function LogList(props) {
  const docs = props.docs;

  docs.sort(
    (dailyEntryA, dailyEntryB) =>
      dailyEntryB.data()["date"] - dailyEntryA.data()["date"]
  );

  return docs.map((doc) => (
    <div className="DailyEntry" key={doc.id}>
      <p>Date: {doc.data()["date"].toDate().toDateString()}</p>
      <p>Mood: {doc.data()["mood"] ?? 'N/A'}</p>
      <p>Sleep: {doc.data()["sleep"] ?? 'N/A'} hours</p>
      <p>Water: {doc.data()["calories"] ?? 'N/A'} cups</p>
      <p>Calories Burned: {doc.data()["calories"] ?? 'N/A'} cal</p>
      <p>Steps Taken: {doc.data()["steps"] ?? 'N/A'} steps</p>
      <p>Exercise: {doc.data()["exercise"] ?? 'N/A'} minutes</p>
      <p>Fatigue: {doc.data()["fatigue"] != null ? doc.data()["fatigue"] ? 'Yes' : 'No' : 'N/A'}</p>
      <p>Fever: {doc.data()["fatigue"] != null ? doc.data()["fever"] ? 'Yes' : 'No' : 'N/A'}</p>
      <p>Cough: {doc.data()["fatigue"] != null ? doc.data()["cough"] ? 'Yes' : 'No' : 'N/A'}</p>
      <p>Congestion: {doc.data()["fatigue"] != null ? doc.data()["congestion"] ? 'Yes' : 'No' : 'N/A'}</p>
      <p>Sore Throat: {doc.data()["fatigue"] != null ? doc.data()["sore throat"] ? 'Yes' : 'No' : 'N/A'}</p>
      <p>Other Ailments: {doc.data()["otherAilments"] ?? 'N/A'}</p>
    </div>
  ));
}

export default App;
