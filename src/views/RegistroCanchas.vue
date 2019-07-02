<template>
    <div class="register">
        <div class="row">
            <div class="col s12 m10 offset-m1 l8 offset-l2 xl6 offset-xl3">
                <div class="card-panel hoverable">
                    <h3 class="izquierda">Registra una canchita</h3>
                    <form @submit="registrar($event)">
                        <div>
                            <div class="row">
                                <div class="col s12">
                                    <p class="justificado grey-text">Local</p>
                                    <select class="browser-default" :disabled="locales.length == 0" v-model="local">
                                        <option :value="item" v-for="(item,key) in locales" :key=key>{{item.name}}</option>
                                    </select>
                                    <div v-if="locales.length == 0" class="card-panel blue white-text center">
                                        <p>No tienes Locales Registrados</p>
                                        <a class="btn waves-effect amber" @click="$router.push('/registrar/local');">Registrar Local</a>  
                                    </div>
                                </div>
                                <div class="input-field col s12">
                                    <input id="nombre" type="text" class="validate"  :disabled="locales.length == 0" v-model="nombre">
                                    <label for="nombre">Nombre</label>
                                </div>
                                <div class="input-field col s12">
                                    <input id="descripcion" type="text" class="validate"  :disabled="locales.length == 0" v-model="descripcion">
                                    <label for="descripcion">Descripción</label>
                                </div>
                                <div class="input-field col s12">
                                    <input id="capacidad" type="text" class="validate"  :disabled="locales.length == 0" v-model="capacidad">
                                    <label for="capacidad">Capacidad</label>
                                </div>

                                <div class="col s12">
                                    <p class="justificado grey-text">Tipo de Cancha</p>
                                    <select class="browser-default" :disabled="(tipos.length == 0) || (locales.length == 0)" v-model="tipo">
                                        <option :value="item" v-for="(item,key) in tipos" :key=key>{{item.nombre}}</option>
                                    </select>
                                </div>
                                <!--<div class="input-field col s12">
                                    <div class="file-field input-field">
                                        <div class="btn waves-effect green">
                                            <span>Imagen</span>
                                            <input type="file" id="file-upload" accept="image/*">
                                        </div>
                                        <div class="file-path-wrapper">
                                            <input class="file-path validate" type="text">
                                        </div>
                                        <div id="file-preview-zone" class="img-contenedor">
                                        </div>
                                    </div>
                                </div>-->
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                            <input type="submit" value="Registrar" class="btn waves-effect green" :class="locales.length > 0 ? '' : 'disabled'">
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
            locales : [],
            local : null,
            tipo : null,
            nombre : "",
            descripcion : "",
            capacidad : ""
        }
    },
    computed : {
        ...mapState(['logeado','usuario','tipos','api','usuario','localDef']),
        vnombre : function(){
            if(this.nombre == "") return false;
            if(this.nombre.length < 3) return false;
            return true;
        },
        vdescripcion : function(){
            if(this.descripcion == "") return false;
            if(this.descripcion.length < 3) return false;
            return true;
        },
        vcapacidad : function(){
            if(this.capacidad == "") return false;
            if(this.capacidad.length < 3) return false;
            return true;
        }
    },
    methods : {
        setLocalDefault : function(){
            if(this.locales.length > 1){
                this.local = this.locales[0];
            }
            if(this.localDef != null){
                for(let i = 0; i < this.locales.length;i++){
                    if(this.locales[i].id == this.localDef.id){
                        this.local = this.locales[i];
                    }
                }
            }
        },
        async getLocales(){
            axios({
                method: 'GET',
                url : this.api + '/api/local/',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json, text/plain, */*",
                    "Authorization" : this.usuario.data.token_type + " " + this.usuario.data.access_token
                }
            })
            .then(
                response => {
                    this.locales = response.data;
                    this.setLocalDefault();
                    //if(this.locales.length > 1){
                      //  this.local = this.locales[0];
                    //}
                    //this.load = false;
                    //M.toast({html: "Local creado!"});
                }
            )
            .catch(error => {
                    //this.load = false;
                    M.toast({html: "Ocurrió un error!"});
                }
            );
        },
        async tryRegCan(){
            axios({
                method: 'POST',
                url : this.api + '/api/court-soccer/',
                data: {
                    "local" : this.local.id,
                    "name" : this.nombre,
                    "description" : this.descripcion,
                    "capacity" : this.capacidad,
                    "material_type" : this.tipo.id
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
                    this.nombre="";this.descripcion="";this.capacidad="";
                    M.toast({html: "Canchita creada!"});
                }
            )
            .catch(error => {
                    this.load = false;
                    M.toast({html: "Ocurrió un error!"});
                }
            );
            
        },
        validar : function(){
            if(!this.vnombre) M.toast({html: "El nombre debe tener al menos 3 letras"});
            if(!this.vdescripcion) M.toast({html: "La descripción debe tener al menos 3 letras"});
            if(!this.vcapacidad) M.toast({html: "Indica la capacidad de la cancha"});
            return this.vnombre && this.vdescripcion && this.vcapacidad;
        },
        registrar : function(event){
            event.preventDefault();
            if(this.validar()){
                this.load = true;
                this.tryRegCan();
            }
        }
    },
    mounted: function () {
        if(!this.logeado){
            this.$router.push("/");
        }
		this.$nextTick(function () {
            this.tipo = this.tipos[0];
            this.getLocales();
            //Setear listener para la imagen
            let fileUpload = document.getElementById('file-upload');
            /*fileUpload.onchange = function (e) {
                let input = e.srcElement;
                if (input.files && input.files[0]) {
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        let filePreview = document.createElement('img');
                        filePreview.id = 'file-preview';
                        filePreview.src = e.target.result;
                        console.log(e.target.result);
                        let previewZone = document.getElementById('file-preview-zone');
                        previewZone.innerHTML = "";
                        previewZone.appendChild(filePreview);
                    }
                    reader.readAsDataURL(input.files[0]);
                } 
            }*/
		});
	}
}
</script>

<style scoped>
 div.img-contenedor img{
     width: 100%;
 }
</style>
