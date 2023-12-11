import { useContext, useEffect, useState } from "react";
import UploadFile from "../function/UploadFile";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import Service from "../services/Service";
// import "./Ml.css"; // Подключаем стили

function Ml() {
  const { store } = useContext(Context);
  const navigation = useNavigate();
  const [historyArray, setHistoryArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchHistory = async () => {
    try {
      const response = await Service.history();
      setHistoryArray(response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  };

  useEffect(() => {
    store.checkAuth().then(() => {
      if (!localStorage.getItem("token_access")) {
        navigation("/login");
      }
      fetchHistory();
    });
  }, [store, navigation]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % historyArray.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? historyArray.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container-history">
      <h1 className="container-title">Чтение текста с картинки</h1>
      <UploadFile />
      <div className="carousel" style={{ position: "relative" }}>
        {historyArray.map((item, index) => (
          <div
            key={item.id}
            className={`carousel-item ${
              index === currentIndex ? "active" : ""
            }`}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translateX(-50%) translateY(-50%)",
            }}
            href={`/${item.image_path}`}
          >
            {/* <img alt={item.response} /> */}
            <h5>{item.response}</h5>
          </div>
        ))}
      </div>
      <button className="prevBtn btn" onClick={prevSlide}>
        Назад
      </button>
      <button className="nextBtn btn" onClick={nextSlide}>
        Вперед
      </button>
    </div>
  );
}

export { Ml };
