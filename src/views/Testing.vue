<template>
    <div class="test white-text">
        <h3>Entorno de pruebas de componentes</h3>
        <div class="row">
            <div class="col s12 izquierda white-text">
                <h4>Tarjeta Campo</h4>
                <div class="row">
                    <div class="col s12 m8 l6 xl4">
                        <Campo
                            :id="campoObj.id"
                            :canchita="campoObj.canchita"
                        ></Campo>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s12 white-text izquierda">
                <pre>{{$data}}</pre>
            </div>
        </div>
        <ModalCampo
            :id="campoElegido.id"
            :obj="campoElegido"
        />
    </div>
</template>
<script>
import Campo from "@/components/Campo.vue";
import ModalCampo from "@/components/ModalCampo.vue";
//Definimos los datos para una tarjeta de campo
let campo = {
    id : 5,
    canchita : {
        id : 5,
        name : "hoña",
        gallery : [
            {"photo" : "https://www.sportaragon.com/wp-content/uploads/2017/09/campo-futbol-universidad-campus-huesca.jpg"}
        ]
    }
}

export default {
    data : function(){
        return {
            campoObj : campo,
            campoElegido : campo.canchita,
        }
    },
    components : {
        Campo, ModalCampo
    },
    methods : {
        detallar : function(){
            console.log("Detallando");
        }
    },
    mounted : function(){
        this.$nextTick(function(){
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems, {});
        });
    }
}
</script>

