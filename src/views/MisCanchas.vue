<template>
<div class="misCanchas">
    <div class="row" v-if="load">
    </div> 
    <div class="row">
        <div class="col s12 izquierda">
            <h3 class="white-text chalk">Mis Canchas: {{localDef.name | min}}</h3>
        </div>
        <div class="col s12" v-if="load">
            <Loader></Loader>
        </div>
        <div class="col s12" v-if="creados.length == 0 && !load">
            <div class="row">
                <div class="col s12 m8 offset-m2 l6 offset-l3 xl4 offset-xl4">
                    <div class="card-panel blue white-text center">
                        <p>No tienes Canchitas Registradas</p>
                        <a class="btn waves-effect amber"
                            @click="$router.push('/registrar/canchita')">
                            Registrar Canchita
                        </a>  
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="vacio">
        <transition
            name="custom-classes-transition"
            enter-active-class="animated slideInUp"
            leave-active-class="animated bounceOutRight"
        >
            <div class="row" v-if="creados.length > 0">
                <div>
                    <div class="col s12 m6 l4 xl3"
                        v-for="(item,key) in creados" :key="key"
                    >
                        <TarjetaCancha
                            :item = "item"
                        ></TarjetaCancha>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import TarjetaCancha from "@/components/TarjetaCancha.vue";
import axios from "axios";
import {mapState, mapMutations} from "vuex";
export default {
    name : "MisCampos",
    components : {
        Loader, TarjetaCancha
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
                    this.asignar(response.data.results);
                    this.load = false;
                }
            )
            .catch(error => {
                    this.load = false;
                    M.toast({html: "La lista de tus canchitas no esta disponible!"});
                }
            );
        },
        asignar : function(lista){
            this.creados = [];
            for(let i = 0; i < lista.length; i++ ){
                if(lista[i].local.id == this.localDef.id){
                    this.creados.push(lista[i]);
                }
            }
        }
    },
    created : function(){
        if(this.localDef == null){
            this.$router.push("/");
        }
    },
    mounted : function(){
        this.$nextTick(function () {
            if(!this.logeado){
                this.$router.push("/");
            }
            //Cargar mis locales
            this.creados = this.localDef.court_soccer;
            //this.getCanchitas();
            //console.log(this.localDef);
		});
    }
}
</script>

<style scoped>
    .vacio{
        min-height: 500px;
    }
</style>