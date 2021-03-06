import HealthDiaryRouter from "component/HealthDiaryRouter";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "fbase";
import { Container } from "react-bootstrap";
function App() {
  const [userObj, setUserObj] = useState(null);
  const [isLogin, setIsLogin] = useState(auth.currentUser);
  const [firebaseInitalized, setFirebaseInitalized] = useState(false);
  //console.log(auth.currentUser); //3번이나 랜더링이 다시되는데?>
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
        setUserObj({
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
        });
      } else {
        setIsLogin(false);
        setUserObj(null);
      }
      setFirebaseInitalized(true);
    });
  }, []);
  return (
    <>
      {firebaseInitalized ? (
        <HealthDiaryRouter isLogin={isLogin} userObj={userObj} />
      ) : (
        "Initailized"
      )}
    </>
  );
}

export default App;
