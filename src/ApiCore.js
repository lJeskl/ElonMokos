import axios from 'axios';

export const checkLogin = (data) => {
  return axios
    .post(`https://ds2project.herokuapp.com/login/in`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addUser = (data) => {
  return axios
    .post(`https://ds2project.herokuapp.com/login`, data)
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
      `https://ds2project.herokuapp.com/detalle?detalle=${detalle}&key=${url}`
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
    .get(`https://ds2project.herokuapp.com/categoria/${token}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const get1Categoria = (name) => {
  return axios
    .get(`https://ds2project.herokuapp.com/categoria/one/${name}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editCategoria = (data) => {
  return axios
    .put(`https://ds2project.herokuapp.com/categoria`, data)
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
    .get(`https://ds2project.herokuapp.com/producto/?categoria=${url}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const sendProduct = (data) => {
  return axios
    .post(`https://ds2project.herokuapp.com/producto`, data)
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
    .put(`https://ds2project.herokuapp.com/producto`, data)
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
    .delete(`https://ds2project.herokuapp.com/producto/${data}`)
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
    .get('https://ds2project.herokuapp.com/usuario')
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getInfoProduct = (url) => {
  return axios
    .get(`https://ds2project.herokuapp.com/producto/one?producto=${url}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addCategoria = (data) => {
  return axios
    .post(`http://ds2project.herokuapp.com/categoria`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCategoria = (id) => {
  return axios
    .delete(`https://ds2project.herokuapp.com/categoria/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
