import Home from "./pages/Home";
import axios from "axios";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  // Context
  const { setData } = useContext(Context);

  // Axios fetch data
  const options = {
    method: "GET",
    url: "https://latest-stock-price.p.rapidapi.com/any",
    headers: {
      "X-RapidAPI-Key": "0ad61fd66bmshf23b37b02d45e3cp124725jsn82e9865409a5",
      "X-RapidAPI-Host": "latest-stock-price.p.rapidapi.com",
    },
  };
  axios
    .request(options)
    .then(function (res) {
      console.log(res.data);
      setData(res.data);
    })
    .catch(function (err) {
      console.error(err);
    });

  // Component
  return <Home />;
}

export default App;
