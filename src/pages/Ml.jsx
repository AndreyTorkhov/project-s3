import { useContext, useEffect, useState } from "react";
import UploadFile from "../function/UploadFile";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import Service from "../services/Service";
import "../styles/ml.css";

export default observer(function Ml() {
  const { store } = useContext(Context);
  const navigation = useNavigate();
  const [historyArray, setHistoryArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselVisible, setCarouselVisible] = useState(false); // Состояние видимости карусели

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

  const showHistory = () => {
    setCarouselVisible(true);
  };

  return (
    <div className="container-history">
      <h1 className="container-title">Чтение текста с картинки</h1>
      <UploadFile />
      {!carouselVisible && (
        <button className="historyBtn" onClick={showHistory}>
          Показать историю
        </button>
      )}
      {carouselVisible && (
        <>
          <h3 className="carousel-title">Прошлые запросы</h3>
          <div className="carousel">
            {historyArray.map((item, index) => (
              <div
                key={item.id}
                className={`carousel-item ${
                  index === currentIndex ? "active" : ""
                }`}
                href={`/${item.image_path}`}
              >
                <h5 className="carousel-text">{item.response}</h5>
              </div>
            ))}
            <button className="prevBtn btn" onClick={prevSlide}>
              Назад
            </button>
            <button className="nextBtn btn" onClick={nextSlide}>
              Вперед
            </button>
          </div>
        </>
      )}
    </div>
  );
});
