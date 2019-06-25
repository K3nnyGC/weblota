<template>
    <div class="regLocal">
        <div class="row">
            <div class="col s12 m10 offset-m1 l8 offset-l2 xl6 offset-xl3">
                <div class="card-panel hoverable">
                    <h3 class="izquierda">Registra un Local</h3>
                    <form @submit="registrarLocal($event)">
                        <div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="nombre" type="text" class="validate" v-model="nombre">
                                    <label for="nombre">Nombre</label>
                                </div>
                                <div class="input-field col s12">
                                    <input id="direccion" type="text" class="validate" v-model="direccion">
                                    <label for="direccion">Dirección</label>
                                </div>
                                <div class="col s12 m6 l6 xl4">
                                    <p class="justificado grey-text">Departamento</p>
                                    <select class="browser-default" :disabled="departamentos.length == 0" @change="cambiarDep" v-model="departamento">
                                        <option :value="item" v-for="(item,key) in departamentos" :key=key>{{item.Nombre}}</option>
                                    </select>
                                </div>
                                <div class="col s12 m6 l6 xl4">
                                    <p class="justificado grey-text">Provincia</p>
                                    <select class="browser-default" :disabled="provincias.length == 0" @change="cambiarProv" v-model="provincia">
                                        <option :value="item" v-for="(item,key) in provincias" :key=key>{{item.Nombre}}</option>
                                    </select>
                                </div>
                                <div class="col s12 m6 l6 xl4">
                                    <p class="justificado grey-text">Distrito</p>
                                    <select class="browser-default" :disabled="distritos.length == 0" v-model="distrito">
                                        <option :value="item" v-for="(item,key) in distritos" :key=key>{{item.Nombre}}</option>
                                    </select>
                                </div>
                                <div class="input-field col s12">
                                    <p> </p>
                                    <textarea id="textarea" class="materialize-textarea" v-model.trim="descripcion"></textarea>
                                    <label for="textarea">Descripcion</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                            <input type="submit" value="Registrar" class="btn waves-effect green" :class="combosOk && !load ? '' : 'disabled'">
                            </div>
                        </div>
                        <div class="row" v-if="load">
                            <div class="col s12 center">
                                <Loader></Loader>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
        <!--<div><pre>{{$data}}</pre></div>-->
    </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import axios from "axios";
import {mapState, mapMutations} from "vuex";
export default {
    name : "register",
    components : {
        Loader
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
            descripcion : "",
            nombre : "",
            direccion : ""
        }
    },
    computed : {
        ...mapState(['logeado','api','apiubi','usuario','localDef']),
        combosOk : function(){
            return this.distritos.length > 0;
        },
        vnombre : function(){
            if(this.nombre == "") return false;
            if(this.nombre.length < 3) return false;
            return true;
        },
        vdireccion : function(){
            if(this.direccion == "") return false;
            if(this.direccion.length < 3) return false;
            return true;
        },
        vdescripcion : function(){
            if(this.descripcion == "") return false;
            if(this.descripcion.length < 3) return false;
            return true;
        }
    },
    methods : {
        ...mapMutations(['setLocal']),
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
        validar : function(){
            if(!this.vnombre) M.toast({html: "El nombre debe tener al menos 3 letras"});
            if(!this.vdireccion) M.toast({html: "La dirección debe tener al menos 3 letras"});
            if(!this.vdescripcion) M.toast({html: "La descripción debe tener al menos 3 letras"});
            return this.vnombre && this.vdireccion && this.vdescripcion;
        },
        registrarLocal : function(event){
            event.preventDefault();
            if(this.validar()){
                this.load = true;
                this.tryRegLoc();
            }
        },
        async tryRegLoc(){
            axios({
                method: 'POST',
                url : this.api + '/api/local/',
                data: {
                    "name" : this.nombre,
                    "address" : this.direccion,
                    "district_ubigeo" : this.distrito.IdUbigeo,
                    "description" : this.descripcion
                },
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json, text/plain, */*",
                    "Authorization" : this.usuario.data.token_type + " " + this.usuario.data.access_token
                }
            })
            .then(
                response => {
                    this.load = false;
                    this.nombre = "";this.direccion="";this.descripcion="";
                    M.toast({html: "Local creado!"});
                }
            )
            .catch(error => {
                    this.load = false;
                    M.toast({html: "Ocurrió un error!"});
                }
            );
            
        }
    },
    mounted: function () {
		this.$nextTick(function () {
            if(!this.logeado){
                this.$router.push("/");
            }
            //Cargar departamentos
            this.getDep();
		});
	}
}
</script>

<style scoped>
 div.img-contenedor img{
     width: 100%;
 }
</style>