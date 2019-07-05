<template>
  <div class="search">
        <div class="row">
            <div class="col s12 m10 offset-m1 l6 xl3">
                <div class="justificado white-text">Departamento</div>
                <select class="browser-default" :disabled="departamentos.length == 0" @change="cambiarDep" v-model="departamento">
                    <option :value="item" v-for="(item,key) in departamentos" :key=key>{{item.Nombre}}</option>
                </select>
            </div>
            <div class="col s12 m10 offset-m1 l6 xl3">
                <div class="justificado white-text">Provincia</div>
                <select class="browser-default" :disabled="provincias.length == 0" @change="cambiarProv" v-model="provincia">
                    <option :value="item" v-for="(item,key) in provincias" :key=key>{{item.Nombre}}</option>
                </select>
            </div>
            <div class="col s12 m10 offset-m1 l6 xl3">
                <div class="justificado white-text">Distrito</div>
                <select class="browser-default" :disabled="distritos.length == 0" v-model="distrito">
                    <option :value="item" v-for="(item,key) in distritos" :key=key>{{item.Nombre}}</option>
                </select>
            </div>
            <div class="col s12 m10 offset-m1 l6 xl3 center">
                <a class="btn waves-effect amber btn-src"
                    :class="[load || distritos.length == 0 ? 'disabled' : '' ]"
                    @click="getCanchitas"
                >Buscar</a>
            </div>
        </div>
    <div class="row" v-if="load">
        <div class="col s12 center">
            <Loader/>
        </div>
    </div>
    <div class="row vacio">
        <div class="col s12 m10 offset-m1 l6 xl4"
            v-for="(item,index) in canchitas"
            :key=index
        >
            <div @click="detallar(item)">
                <Campo
                :id = "index"
                :canchita = "item"
                ></Campo>
            </div>
        </div>
    </div>
    
    <ModalCampo
        :id="campoElegido.id"
        :obj="campoElegido"
    />
    
    
    <!--<div class="izquierda">
      <pre>{{$data}}</pre>
    </div>-->
  </div>
</template>

<script>
// @ is an alias to /src
import Loader from "@/components/Loader.vue";
import {mapState, mapMutations} from "vuex";
import Campo from '@/components/Campo.vue';
import ModalCampo from "@/components/ModalCampo.vue";
import axios from "axios";

export default {
  name: 'home',
  components: {
    Campo, Loader, ModalCampo
  },
  data : function(){
    return {
        load : false,
        departamentos : [],
        provincias : [],
        distritos : [],
        departamento : null,
        provincia : null,
        distrito : null,
        canchitas : [],
        campoElegido : {
            id : -1,
            gallery : [
                {photo : ""}
            ]
        }
    }
  },
  computed :{
      ...mapState(['logeado','api','apiubi','usuario','localDef']),
  },
  methods : {
        async getDep(){
            axios({method: 'GET',url : this.apiubi})
            .then(response => {this.departamentos = response.data;this.departamento = response.data[0];});
        },
        cambiarDep: function(){
            this.provincias = [];
            this.distritos = [];
            if(this.departamento.IdDepartamento !== "00"){
                this.getProv();
            }
        },
        async getProv(){
            axios({method: 'GET',url : this.apiubi + '/' + this.departamento.IdDepartamento})
            .then(response => {this.provincias = response.data;this.provincia = response.data[0];this.getDist();});
        },
        cambiarProv: function(){
            this.getDist();
        },
        async getDist(){
            let salida = await axios.get(this.apiubi + '/' + this.departamento.IdDepartamento+"/"+this.provincia.IdProvincia);
            this.distritos = await salida.data;
            this.distrito = await salida.data[0];
        },
        async getCanchitas(){
            this.load = true;
            axios({
                method: 'GET',
                url : this.api + '/api/court-soccer/',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json, text/plain, */*",
                    "Authorization" : this.usuario.data.token_type + " " + this.usuario.data.access_token
                }
            })
            .then(
                response => {
                    this.filtrar(response.data);
                    this.load = false;
                }
            )
            .catch(error => {
                    this.load = false;
                    M.toast({html: "La lista de canchitas no esta disponible!"});
                }
            );
        },
        filtrar : function(lista){
            this.canchitas = [];
            for(let i = 0; i < lista.length; i++){
                if(lista[i].local.district_ubigeo == this.distrito.IdUbigeo){
                    this.canchitas.push(lista[i]);
                }
            }
            if(this.canchitas.length == 0){
                M.toast({html: "No hay canchitas aun en " + this.distrito.Nombre +"!"});
            }
            
        },
        detallar : function(canchita){
            this.campoElegido = {};
            this.campoElegido = canchita;
            console.log("Detallando..........");
        }
  },
	mounted: function () {
		this.$nextTick(function () {
            if(!this.logeado){
                this.$router.push("/login");
                M.toast({html: "Debes estar logeado!"});
            } else {
                var elems = document.querySelectorAll('.modal');
                var instances = M.Modal.init(elems, {});
                this.getDep();
            }
            
		});
	}
}
</script>

<style scoped>
    .btn-src{
        width: 100%;
        margin-top: 21px;
        height: 46px;
        line-height: 46px;
    }
</style>

