<template>
<div class="misLocales">
    <div class="row" v-if="load">
    </div> 
    <div class="row">
        <div class="col s12 izquierda">
            <h3 class="white-text chalk">Mis locales</h3>
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
                    <Tarjetalocal
                        :item = "item"
                    ></Tarjetalocal>
                </div>
            </div>
        </div>
        </transition>
    </div>
</div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import Tarjetalocal from "@/components/Tarjetalocal.vue";
import axios from "axios";
import {mapState, mapMutations} from "vuex";
export default {
    name : "MisCampos",
    components : {
        Loader, Tarjetalocal
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
