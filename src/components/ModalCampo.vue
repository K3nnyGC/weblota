<template>
    <!-- Modal Structure -->
    <div :id="'modal'+id" class="modal  bottom-sheet blacksoft white-text">
        <div class="modal-content blacksoft-text izquierda padre">
            <h4 class="white-text eraser chalk">{{obj.name}}</h4>
            <p class="white-text justificado">{{textos.description}}</p>
            <p class="white-text justificado">Capacidad: {{textos.capacity}}</p>
            <p class="white-text justificado">Material: {{tipo}}</p>
            <!--<p>{{foto}}</p>-->
            <!--<pre class="white-text">{{obj}}</pre>-->
            
            <div class="row">
                <div class="col s12 m10 offset-m1 l8 offset-l2">
                    <div v-if="obj.gallery.length > 0">
                        <div class="carousel carousel-slider">
                            <div class="carousel-fixed-item center">
                            </div>
                            <div class="carousel-item" :href="'#'+item.id+'!'" v-for="item in obj.gallery" :key="item.id">
                                <img class="imagen responsive-img" src="/Assets/img/169.png" alt="No veo el campo :(" :style="{'backgroundImage' : 'url('+ item.photo +')'}">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h4 class="white-text justificado">Horatio de atención:</h4>
            <p class="white-text justificado">{{obj.local ? obj.local.name : 'Este local'}} atiende desde las {{textos.begin}} hasta las {{textos.end}} y los espera en {{textos.address}}</p>
            <br><br>
            <a class="btn-floating btn-large waves-effect waves-light amber hijo cerrar z-depth-3 modal-close">
                <i class="fal fa-times blacksoft-text"></i>
            </a>
        </div>
        <!--<div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>-->
    </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";
export default {
    data : function(){
        return {
        }
    },
    props : {
        id : Number,
        obj : Object
    },
    computed : {
        ...mapState(['tipos']),
        foto : function(){
            return this.obj.gallery.length > 0 ? this.obj.gallery[0].photo : "No hay foto";
        },
        tipo : function(){
            let t = "No definido";
            for(let i = 0; i < this.tipos.length; i++){
                if(this.tipos[i].id == this.textos.material_type){
                    t = this.tipos[i].nombre;
                }
            }
            return t;
        },
        textos : function(){
            return {
                "description" : this.obj.description ? this.obj.description : '',
                "capacity" : this.obj.capacity ? this.obj.capacity : '',
                "material_type" : this.obj.material_type ? this.obj.material_type : 0,
                "address" : this.obj.local ? this.obj.local.address : '',
                "begin" : this.obj.start_time ? this.obj.start_time : '¿?',
                "end" : this.obj.end_time ? this.obj.end_time : '¿?'
            }
        }
    },
    methods : {
        cambiar : function(){
            var elems = document.querySelectorAll('.carousel');
            var instances = M.Carousel.init(elems, {
                fullWidth: true,
                indicators: true});
            var instance = M.Carousel.init({
                fullWidth: true
            });
        }
    },
    updated : function(){
        this.cambiar();
    }
}
</script>

<style>
    .imagen{
        width: 100%;
        /*border : white solid 10px;*/
        background-image : url("/Assets/img/field.m.jpeg");
        background-repeat : no-repeat;
        background-position: center;
        background-size : cover;
    }
    .cerrar{
        bottom: 25px;
        right: 25px;
        z-index: 1000000;
    }
</style>


