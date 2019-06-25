<template>
<div class="misLocales">
    <div class="row" v-if="load">
    </div> 
    <div class="row vacio">
        <div class="col s12 izquierda">
            <h3>Mis locales</h3>
        </div>
        <div class="col s12" v-if="load">
            <Loader></Loader>
        </div>
        <div class="col s12" v-if="creados.length == 0 && !load">
            <div class="row">
                <div class="col s12 m8 offset-m2 l6 offset-l3 xl4 offset-xl4">
                    <div class="card-panel blue white-text center">
                        <p>No tienes Locales Registrados</p>
                        <a class="btn waves-effect amber"
                            @click="$router.push('/registrar/local')">
                            Registrar Local
                        </a>  
                    </div>
                </div>
            </div>
        </div>
        <div class="col s12 m6 l4 xl3"
            v-for="(item,key) in creados" :key="key"
        >
            <div class="card izquierda hoverable lime accent-1 rotado padre">
                <img src="/Assets/img/pin.png" class="hijo ocultar" style="top:0px;right:30%">
                <div class="card-content local-card">
                    <h4>{{item.name}}</h4>
                    <address>
                        <p class="p1 justificado"><b>Dirección:</b> {{item.address}}</p>
                        <p class="p1 p2 justificado"><b>Descripción:</b> {{item.description}}</p>
                    </address>
                </div>
                <div class="card-action derecha">
                    <a class="manito blacksoft-text" @click="addCancha(item)">Agregar Canchas</a>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import axios from "axios";
import {mapState, mapMutations} from "vuex";
export default {
    name : "MisCampos",
    components : {
        Loader
    },
    data : function(){
        return {
            load : false,
            creados : []
        }
    },
    computed : {
        ...mapState(['logeado','api','apiubi','usuario','localDef']),
    },
    methods : {
        ...mapMutations(['setLocal']),
        async getLocales(){
            this.load = true;
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
                    this.creados = response.data;
                    this.load = false;
                }
            )
            .catch(error => {
                    this.load = false;
                    M.toast({html: "La lista de tus locales no esta disponible!"});
                }
            );
        },
        addCancha : function(local){
            this.setLocal(local);
            this.$router.push("/registrar/canchita");
        }
    },
    mounted : function(){
        this.$nextTick(function () {
            if(!this.logeado){
                this.$router.push("/");
            }
            //Cargar mis locales
            this.getLocales();
		});
    }
}
</script>

<style scoped>
    .manito{
        cursor : pointer;
    }
    .local-card{
        height: 300px;
    }
    .p1{
        overflow-y: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow-x: hidden;
    }
    .p2{
        white-space: pre-line;
        max-height: 100px;
    }
    .vacio{
        min-height: 500px;
    }
    @media screen and (min-width: 992px) {
        .rotado{
            transform: rotate(-2deg);
        }
    }
    @media screen and (max-width: 991px) {
        .ocultar{
            display: none;
        }
    }
</style>
