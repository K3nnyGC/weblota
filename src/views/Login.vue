<template>
    <div class="login">
        <div class="row">
            <div class="col s12 m10 offset-m1 l8 offset-l2 xl6 offset-xl3">
                <div class="card-panel hoverable">
                    <div class="switch right">
                        <label>
                        Acceso
                        <input type="checkbox" v-model="pin">
                        <span class="lever green"></span>
                        Registro
                        </label>
                    </div>
                    <h3 class="justificado">{{pin ? 'Registro' : 'Acceso'}}</h3>
                    <form @submit="enviar($event)">
                        <div>
                            <div class="row" v-if="pin">
                                <div class="input-field col s6">
                                    <input id="first_name" type="text" class="validate" v-model.trim="nombre" :class="[vnombre ? '' : 'red-text']">
                                    <label for="first_name" :class="[nombre != '' ? 'active' : '']">Nombre</label>
                                </div>
                                <div class="input-field col s6">
                                    <input id="last_name" type="text" class="validate" v-model.trim="apellido" :class="[vapellido ? '' : 'red-text']">
                                    <label for="last_name" :class="[apellido != '' ? 'active' : '']">Apellido</label>
                                </div>
                                <div class="input-field col s6">
                                    <input id="user_name" type="text" class="validate" v-model.trim="username" :class="[vusuario ? '' : 'red-text']">
                                    <label for="user_name" :class="[username != '' ? 'active' : '']">Usuario</label>
                                </div>
                                <div class="input-field col s6">
                                    <input id="dni" type="number" class="validate"  step="1" min=0 v-model.trim="dni" :class="[vdni ? '' : 'red-text']">
                                    <label for="dni" :class="[dni != '' ? 'active' : '']">DNI</label>
                                </div>
                                <div class="input-field col s6">
                                    <input id="telephone" type="number" class="validate" step="1" min=0 v-model.trim="telefono" :class="[vtelefono ? '' : 'red-text']">
                                    <label for="telephone" :class="[telefono != '' ? 'active' : '']">Teléfono</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12" v-if="pin">
                                <input id="email" type="email" class="validate" v-model.trim="correo" :class="[vcorreo ? '' : 'red-text']">
                                <label for="email" :class="[correo != '' ? 'active' : '']">Email</label>
                            </div>
                            <div class="input-field col s12" v-if="!pin">
                                <input id="user_name2" type="text" class="validate" v-model.trim="username" :class="[vusuario ? '' : 'red-text']">
                                <label for="user_name2" :class="[username != '' ? 'active' : '']">Usuario</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                            <input id="password" type="password" class="validate" v-model.trim="pass1" :class="[vpas1 ? '' : 'red-text']">
                            <label for="password" :class="[pass1 != '' ? 'active' : '']">Contraseña</label>
                            </div>
                            <p class="right" v-if="!pin"><a class="btn btn-flat waves-effect transparent blue-text" @click="recuperar">Olvidé mi contraseña</a></p>
                        </div>
                        <div class="row" v-if="pin">
                            <div class="input-field col s12">
                            <input id="password2" type="password" class="validate" v-model.trim="pass2" :class="[vpas2 ? '' : 'red-text']">
                            <label for="password2" :class="[pass2 != '' ? 'active' : '']">Repita la contraseña</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                            <input type="submit" :value="pin ? 'Registrar' : 'Acceder'" class="btn waves-effect green" :class="[load ? 'disabled' : '']">
                            </div>
                            <div class="col s12 centrado" v-show="load">
                                <Loader></Loader>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
        <!--<div>
            <div class="row">
                <div class="col s12">
                    <ul class="collapsible">
                        <li>
                            <div class="collapsible-header">Data</div>
                            <div class="collapsible-body amber">
                                <pre>
                                    {{$data}}
                                </pre>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>-->
    </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import axios from "axios";
import {mapState, mapMutations} from "vuex"

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
export default {
    name : "login",
    components : {
        Loader
    },
    data : function(){
        return {
            pin : false,
            nombre : "",
            apellido : "",
            username : "",
            pass1 : "",
            pass2 : "",
            correo : "",
            telefono : "",
            dni : "",
            load : false,
            respuesta : {}
        }
    },
    computed : {
        ...mapState(['logeado','api','clientID','secrete']),
        //validando
        vnombre : function(){
            if(this.nombre == "") return false;
            if(this.nombre.length < 3) return false;
            return true;
        },
        vapellido: function(){
            if(this.apellido == "") return false;
            if(this.apellido.length < 3) return false;
            return true;
        },
        vusuario: function(){
            if(this.username == "") return false;
            if(this.username.length < 5) return false;
            return true;
        },
        vdni: function(){
            if(this.dni.length !== 8) return false;
            return true;
        },
        vtelefono: function(){
            if(this.telefono.length < 6) return false;
            return true;
        },
        vcorreo: function(){
            if(this.correo == "") return false;
            let regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
            if (!regex.test(this.correo))  return false;
            return true;
        },
        vpas1: function(){
            if(this.pass1 == "") return false;
            if(this.pass1.length < 8) return false;
            let regex = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
            if (!regex.test(this.pass1))  return false;
            return true;
        },
        vpas2: function(){
            if(this.pass1 !== this.pass2 ) return false;
            return true;
        },
    },
    methods : {
        ...mapMutations(['logear','logout']),
        enviar : function(event){
            event.preventDefault();
            if(this.pin && this.validado() ){
                this.load = true;
                this.tryReg();
            } else if(!this.pin) {
                this.load = true;
                this.tryLogin();
            }
            
        },
        validado : function(){
            if(!this.vnombre) M.toast({html: "El nombre debe tener al menos 3 letras."});
            if(!this.vapellido) M.toast({html: "El apellido debe tener al menos 3 letras."});
            if(!this.vusuario) M.toast({html: "El nombre de usuario debe tener al menos 3 letras."});
            if(!this.vdni) M.toast({html: "El DNI debe tener 8 dífitos."});
            if(!this.vtelefono) M.toast({html: "El telefono debe tener al menos 6 dígitos."});
            if(!this.vcorreo) M.toast({html: "El correo debe tener el formato xx@xx.xx"});
            if(!this.vpas1) M.toast({html: "La contraseña debe tener al menos 8 caracteres y debe contener minusculas, mayusculas y números."});
            if(!this.vpas2) M.toast({html: "Las contraseñas no son iguales."});
            return this.vnombre && this.vapellido && this.vusuario && this.vdni && this.vtelefono && this.vcorreo && this.vpas1 && this.vpas2;
        },
        recuperar : function(){
            M.toast({html: "Envie un correo a recuperar@weblota.com.pe, desde el correo de la cuenta."});
        },
        async tryReg(){

            axios({
                method: 'POST',
                url : this.api + '/api/socceruser/',
                data: {
                    "dni" : this.dni,
                    "username" : this.username,
                    "first_name" : this.nombre,
                    "last_name" : this.apellido,
                    "password" : this.pass1,
                    "email" : this.correo,
                    "telephone" : this.telefono
                },
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json, text/plain, */*"
                }
            })
            .then(
                response => {
                    this.load = false;
                    M.toast({html: "Usuario creado!"});
                    this.pin = false;
                    this.tryLogin();
                }
            )
            .catch(error => {
                    this.load = false;
                    if(error.response && error.response.data){
                        if(Object.keys(error.response.data).length > 0){
                            for(let key in error.response.data){
                                for(let i = 0; i < error.response.data[key].length; i++){
                                    M.toast({html: error.response.data[key][i]});
                                }
                            }
                        } else {
                            M.toast({html: "Ocurrió un error!"});
                        }
                    } else {
                        M.toast({html: "Ocurrió un error!"});
                    }
                    
                }
            );
            
        },
        async tryLogin(){

            axios({
                method: 'POST',
                url : this.api + '/o/token/?client_id=' + this.clientID + '&client_secret='+ this.secrete + '&grant_type=password&scope=read%20write&username='+ this.username + '&password=' + this.pass1,
                data: {
                },
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json, text/plain, */*"
                }
            })
            .then(
                response => {
                    this.load = false;
                    this.logear({
                        "nombre" : this.username,
                        "datos" : response.data});
                    M.toast({html: "Usuario Logeado!"});
                    this.$router.push("/");
                }
            )
            .catch(error => {
                    this.load = false;
                    console.log(error);
                    if (error.response){
                        M.toast({html : error.response.data.error_description});
                    } else {
                        M.toast({html: "Ocurrió un errorx2!"});
                    }
                }
            );
            
        },
        doColapse : function(){
            let elems = document.querySelectorAll('.collapsible');
            let instances = M.Collapsible.init(elems, {});
        }
    },
    mounted: function () {
		this.$nextTick(function () {
            if(this.logeado){
                this.$router.push("/");
            }
            this.doColapse();
		});
	}
}
</script>
