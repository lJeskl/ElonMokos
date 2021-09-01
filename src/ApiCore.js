import axios from 'axios';

export const checkLogin = (data) => {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/login/in`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addUser = (data) => {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/login`, data)
    .then((res) => {
      return res.data.existe;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDetalles = (detalle, url) => {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/detalle?detalle=${detalle}&key=${url}`
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCategoria = (token) => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/categoria/${token}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const get1Categoria = (name) => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/categoria/one/${name}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editCategoria = (data) => {
  return axios
    .put(`${process.env.REACT_APP_API_URL}/categoria`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};

export const getProducts = (url) => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/producto/?categoria=${url}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const sendProduct = (data) => {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/producto`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};

export const editProduct = (data) => {
  return axios
    .put(`${process.env.REACT_APP_API_URL}/producto`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};

export const deleteProduct = (data) => {
  return axios
    .delete(`${process.env.REACT_APP_API_URL}/producto/${data}`)
    .then((res) => {
      console.log('F');
      return res.data;
    })
    .catch((err) => {
      console.log(err.response);
      return err.response;
    });
};

export const getUsuarios = () => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/usuario`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUsuario = (correo) => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/usuario/${correo}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteUsuario = (correo) => {
  return axios
    .delete(`${process.env.REACT_APP_API_URL}/usuario/${correo}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getTipoUsuario = () => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/tipoid/rol`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editUser = (data) => {
  return axios
    .put(`${process.env.REACT_APP_API_URL}/usuario`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getInfoProduct = (url) => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/producto/one?producto=${url}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addCategoria = (data) => {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/categoria`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const deleteCategoria = (id) => {
  return axios
    .delete(`${process.env.REACT_APP_API_URL}/categoria/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getTipoId = () => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/tipoid`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};
