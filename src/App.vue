<template>
  <div id="app">
    <!-- Menu logeado -->
    <div v-if="logeado">
        <ul id="dropdown1" class="dropdown-content ancho blacksoft-text" >
            <li v-if="logeado">
                <router-link to="/locales" class="blacksoft-text">Mis Locales</router-link>
            </li>
            <li v-if="logeado">
                <router-link to="/registrar/local" class="blacksoft-text">Registrar Locales</router-link>
            </li>
            <li v-if="logeado">
                <router-link to="/registrar/canchita" class="blacksoft-text">Registrar Canchitas</router-link>
            </li>
            <li class="divider"></li>
            <li v-if="logeado" @click="cerrar"><a class="blacksoft-text">Salir</a></li> 
        </ul>
    </div>
    
    <!-- Nav -->
    <nav class="green" role="navigation">
      <div class="nav-wrapper container padre">
          <h4 class="hijo centrado-absoluto zero">Weblota</h4>
          <ul class="right hide-on-med-and-down">
              <li><router-link to="/">Inicio</router-link></li>
              <li><router-link to="/about">Acerca</router-link></li>
              <li v-if="!logeado"><router-link to="/login">Acceder</router-link></li>
              <li v-else class="liicon blacksoft-text">
                <a class="dropdown-trigger" data-target="dropdown1" id="menu">
                  <i class="fal fa-user"></i> {{usuario.username}} <i class="fal fa-sort-down"></i>
                </a>
              </li> 
          </ul>
          <!-- Movil -->
          <ul id="nav-mobile" class="sidenav fondoMenu">
              <li class="blacksoft-text izquierda" @click="irA"><router-link to="/">Inicio</router-link></li>
              <li class="blacksoft-text izquierda" @click="irA"><router-link to="/about">Acerca</router-link></li>
              <li v-if="logeado" class="blacksoft-text izquierda" @click="irA"><router-link to="/locales">Mis Locales</router-link></li>
              <li v-if="logeado" class="blacksoft-text izquierda" @click="irA"><router-link to="/registrar/local">Registrar Locales</router-link></li>
              <li v-if="logeado" class="blacksoft-text izquierda" @click="irA"><router-link to="/registrar/canchita">Registrar Canchitas</router-link></li>
              <li v-if="!logeado" class="blacksoft-text izquierda" @click="irA"><router-link to="/login">Acceder</router-link></li>
              <li v-else class="blacksoft-text izquierda">
                  <a><i class="fal fa-user"></i> {{usuario.username}}</a>
              </li>
              <li class="divider"></li>
              <li v-if="logeado" @click="cerrar" class="blacksoft-text izquierda">
                  <a><i class="fal fa-sign-out-alt"></i>&nbsp;Salir</a>
              </li>
          </ul>
          <a href="#" data-target="nav-mobile" class="sidenav-trigger white-text"><i class="fas fa-bars"></i></a>
      </div>
    </nav>
    <div>
      <transition name="fade" mode="out-in">
        <router-view class="ancho-todo"/>
      </transition>
    </div>

    <footer class="page-footer green">
            <div class="container">
                <div class="row">
                    <div class="col l6 s12">
                        <h5 class="white-text">Equipo #1</h5>
                        <p class="grey-text text-lighten-4 justificado">Weblota es una aplicación que le permite a los "peloteros" buscar un lugar donde poder jugar a su deporte favorito, con la mayor comodidad al menor costo.</p>
        
                    </div>
                    <div class="col l3 s12">
                        <h5 class="white-text">Repositorios</h5>
                        <ul>
                            <li><a class="white-text" href="https://github.com/K3nnyGC/k3nnygc.github.io">Front Producción</a></li>
                            <li><a class="white-text" href="https://github.com/K3nnyGC/weblota">Front Desarrollo</a></li>
                            <li><a class="white-text" href="#!">-</a></li>
                            <li><a class="white-text" href="#!">-</a></li>
                        </ul>
                    </div>
                    <div class="col l3 s12">
                        <h5 class="white-text">Links</h5>
                        <ul>
                            <li><a class="white-text" href="http://weblota.pe.hu/">Weblota.pe</a></li>
                            <li><a class="white-text" href="https://k3nnygc.github.io/">Weblota github</a></li>
                            <li><a class="white-text" href="https://weblota-api.herokuapp.com/admin">Weblota Admin</a></li>
                            <li><a class="white-text" href="#!">-</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                <div class="container blacksoft-text">
                    Diseñado con <i class="fab fa-css3-alt"></i>&nbsp;<i class="fab fa-html5"></i>&nbsp;<i class="fab fa-js"></i>&nbsp;<i class="fab fa-python"></i>
            </div>
        </div>
    </footer>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";

export default {
  name : "App",
  computed : {
    ...mapState(['logeado','usuario'])
  },
  methods : {
    ...mapMutations(['logout','logear']),
    cerrar : function(){
      this.logout();
      this.$router.push("/");
      this.irA();
    },
    irA : function(){
      let ele = document.getElementById("nav-mobile");
      M.Sidenav.getInstance(ele).close();

    }
  },
  mounted: function () {
    let data = localStorage.getItem('data');
    console.log(data);
    if(data){
        this.logear(JSON.parse(data));
    }
		this.$nextTick(function () {
          
        });
  },
  updated : function(){
        let elems = document.querySelectorAll('.dropdown-trigger');
        let instances = M.Dropdown.init(elems, {}); 
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.liicon{
  margin-bottom: -10px;
  margin-left: 10px;
  margin-top: -4px;
}
.ancho{
    width: 200px !important;
}

.fondoMenu{
    background-color: rgba(70, 173, 74);
    background-color: rgba(70, 173, 74, 0.957);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.ancho-todo{
    width : 100%;
    overflow-x: hidden;
}

.vacio{
    min-height: 600px;
}

.fp{
    background-image: url(/Assets/img/back.jpg);
    background-attachment: fixed;
    background-repeat : no-repeat;
    background-size: cover;
    background-position: top center;
}

@media screen and (max-width: 800px) {
  .fp{
    background-image: url(/Assets/img/back.m.jpg);
    background-size: 100% 700px;
  }
}

</style>
