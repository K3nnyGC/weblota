<template>
  <div class="foto">
      <div class="card-panel  contenerdor-campo hoverable p0 f-dina">
          <div class="imagen-contenedor padre tranparent">
              <img :id="'campo'+FotoObj.id" class="imagen responsive-img" src="/Assets/img/169.png" alt="No veo el campo :(" :style="{'backgroundImage' : imagen}">
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
    name: 'Foto',
    props: {
        FotoObj : Object
    },
    computed : {
        ...mapState(['api']),
        imagen : function(){
            return "url(" + this.api + this.FotoObj.photo + ") , url(/Assets/img/field.m.jpeg)";
        }
    },
    mounted: function () {
		this.$nextTick(function () {
            //let elems = document.querySelectorAll('.materialboxed');
            //let instances = M.Materialbox.init(elems, {});
		});
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.titulo-campo{
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;

  left: 5px;
  bottom: 5px;
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
}
.imagen{
    width: 100%;
    /*border : white solid 10px;*/
    background-image : url("/Assets/img/field.m.jpeg");
    background-repeat : no-repeat;
    background-position: center;
    background-size : cover;
}
.f-dina:hover{
    background-color : gold;
}
</style>