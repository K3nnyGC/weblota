<template>
    <div class="campo">
        <div class="card-panel  contenerdor-campo hoverable p0">
            <div class="imagen-contenedor padre">
                <img :id="'campo'+id" class="imagen responsive-img" src="/Assets/img/169.png" alt="No veo el campo :(" :style="{'backgroundImage' : imagen}" @click="detallar()">
                <p class="titulo-campo hijo">{{canchita.name}}</p>
                <a class="btn-floating btn-large waves-effect waves-light amber hijo cart z-depth-3" @click="reservar()">
                    <i class="fal fa-cart-plus blacksoft-text"></i>
                </a>
            </div>
            <!--<p class="centrado">
                <a class="btn waves-effect green">Reservar</a>
            </p>-->
        </div>      
</div>
</template>

<script>
import {mapState,mapMutations} from "vuex";
export default {
  name: 'Campo',
  props: {
      id : Number,
      canchita : Object
  },
  computed : {
    ...mapState(['api']),
    imagen : function(){
            if(this.canchita.gallery.length > 0){
              return "url(" + this.canchita.gallery[0].photo + ") , url(/Assets/img/field.m.jpeg)";
            } else {
              return "unset"
            }
        }
  },
  methods : {
      reservar : function(){
          console.log("Reservando...");
      },
      detallar : function(){
            var elems = document.querySelectorAll('.modal');
            if(elems.length > 0){
                var instance = M.Modal.getInstance(elems[0]);
                instance.open();
            }
      }
    },
    mounted: function () {
		this.$nextTick(function () {
            //let elems = document.querySelectorAll('.materialboxed');
            //let instances = M.Materialbox.init(elems, {});
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.titulo-campo{
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;

  left: 0px;
  top: 5px;
  padding-left: 5px;
  color : white;
  font-weight: 600;
  text-shadow: 1px 1px 1px black;
  width: 90%;
  background-color: rgb(0,0,0,0.5);
}
.contenerdor-campo{
  overflow-x : hidden;
}
.imagen-contenedor{
    width: 100%;
    overflow-y: hidden;
    margin-bottom: -10px;
}
.imagen{
    width: 100%;
    /*border : white solid 10px;*/
    background-image : url("/Assets/img/background1.jpg");
    background-repeat : no-repeat;
    background-position: center;
    background-size : cover;
}

.cart{
    bottom: 25px;
    right: 25px;
}

</style>
