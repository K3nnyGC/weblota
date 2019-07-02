<template>
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
            <a class="manito blacksoft-text" @click="showCancha(item)"><i class="fal fa-exclamation-circle"></i> Canchas</a>
            <a class="manito blacksoft-text" @click="addCancha(item)"><i class="fal fa-plus-circle"></i> Agregar</a>
        </div>
    </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";
export default {
    name : "TarjetaLocal",
    props : {
        item : Object
    },
    methods : {
        ...mapMutations(['setLocal']),
        addCancha : function(local){
            this.setLocal(local);
            this.$router.push("/registrar/canchita");
        },
        showCancha : function(local){
            this.setLocal(local);
            this.$router.push("/canchitas");
        }
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
