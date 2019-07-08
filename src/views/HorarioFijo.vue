<template>
    <div class="Fijos">
        <div class="row">
            <div class="col s12">
                <h3>Horario fijo</h3>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState,mapMutations} from "vuex";
import axios from "axios";
export default {
    name : "fijos",
    data : function(){
        return {
            load : false,
        }
    },
    computed : {
        ...mapState(["logeado","usuario","api","canchitaDef"]),
    },
    methods : {
        async getHorario(){
            this.load = true;
            axios({
                method: 'GET',
                url : this.api + '/api/schedule/' + '?court_soccer=40',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json, text/plain, */*",
                    "Authorization" : this.usuario.data.token_type + " " + this.usuario.data.access_token
                }
            })
            .then(response => {this.load = false;console.log(response.data);})
            .catch(error => {this.load = false;M.toast({html: "La lista de canchitas no esta disponible!"});});
        }
    },
    mounted : function(){
        if(this.canchitaDef == null){
            this.$router.push("/");
        } else {
            if(!this.logeado){
                this.$router.push("/login");
                M.toast({html: "Debes estar logeado!"});
            }
        }
        this.getHorario();
    }
    
}
</script>

