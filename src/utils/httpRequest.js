import axios from "axios";

export const fetchData = ({ brand, model, kmMin, kmMax }) => {
  const options = {
    url: "/api/car",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      brand,
      model,
      kmMin,
      kmMax,
    },
  };

  return axios(options)
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};

export const searchData = ({ id }) => {
  const options = {
    url: "/api/searchCar",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      id
    },
  };

  return axios(options)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};
