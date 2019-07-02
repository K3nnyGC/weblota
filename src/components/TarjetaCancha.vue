<template>
    <div class="card izquierda hoverable blue darken-3 rotado padre white-text">
        <img src="/Assets/img/pin.png" class="hijo ocultar" style="top:0px;right:30%">
        <div class="card-content local-card">
            <h4>{{item.name}}</h4>
            <address>
                <p class="p1 justificado"><b>Capacidad:</b> {{item.capacity}}</p>
                <p class="p1 p2 justificado"><b>Descripción:</b> {{item.description}}</p>
                <p class="p1 p2 justificado"><b>Tipo:</b> {{tipos[item.material_type].nombre}}</p>
            </address>
        </div>
        <div class="card-action derecha ">
            <a class="manito white-text" @click="showGallery(item)"><i class="fal fa-images"></i> Galeria</a>
            <a class="manito white-text" @click="showHours(item)"><i class="fal fa-images"></i> Horarios</a>
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
    computed : {
        ...mapState(['tipos'])
    },
    methods : {
        ...mapMutations(['setCanchita']),
        showGallery : function(canchita){
            this.setCanchita(canchita);
            this.$router.push("/canchitas/galeria");
        },
        showHours: function(canchita){
            this.setCanchita(canchita);
            this.$router.push("/canchitas/horarios");
        },
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