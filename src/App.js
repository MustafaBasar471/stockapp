import Home from "./pages/Home";
import axios from "axios";
import { useContext, useEffect } from "react";
import { Context } from "./context/Context";

function App() {
  // Context
  const { setData } = useContext(Context);

  // Axios fetch data

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://latest-stock-price.p.rapidapi.com/any",
      headers: {
        "X-RapidAPI-Key":
          "getapikeyfrom https://rapidapi.com/suneetk92/api/latest-stock-price/",
        "X-RapidAPI-Host": "latest-stock-price.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then(function (res) {
        setData(res.data);
      })
      .catch(function (err) {
        console.error(err);
      });
  }, [setData]);

  // Component
  return <Home />;
}

export default App;
