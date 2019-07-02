import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logeado : false,
    usuario : {
    },
    api : "https://weblota-api.herokuapp.com",
    apiubi : "http://ubigeows.somee.com/api/ubigeo",
    clientID : "64AU9CN3gxEiuG2JkdhWhwNBUCrrPa7cw0J2CCOR",
    secrete : "dNfAkKiNkLhNsB6fp0D8rYK5sAH6O1agSMBequQYK52xO287JUxAgaAiwYEbmiSqqnb3aeVoKus7MIp8cwILu0RzNrvO7yO72UDnPjuESF85uOjJPtQMwA75ZmA815ZY",
    tipos : [
      {"id" : 0, "nombre" : "Grass Sintetico"},
      {"id" : 1, "nombre" : "Grass Natural"},
      {"id" : 2, "nombre" : "Tierra"},
      {"id" : 3, "nombre" : "Losa"},
    ],
    localDef : null,
    canchitaDef : null,
  },
  mutations: {
    logear(state,payload){
      state.logeado = true;
      state.usuario.username = payload.nombre;
      state.usuario.data = payload.datos;
      localStorage.setItem('data', JSON.stringify(payload));
    },
    logout(state){
      state.logeado = false;
      state.usuario = {};
      localStorage.removeItem('data');
    },
    setLocal : function(state,local){
      state.localDef = local;
    },
    setCanchita : function(state,canchita){
      state.canchitaDef = canchita;
    }
  },
  actions: {

  }
})
