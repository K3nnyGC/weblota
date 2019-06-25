<template>
  <div class="campo">
      <div class="card-panel  contenerdor-campo hoverable p0">
          <div class="imagen-contenedor padre">
              <img :id="'campo'+id" class="imagen responsive-img materialboxed" src="/Assets/img/169.png" alt="No veo el campo :(">
              <p class="titulo-campo hijo">Campo 53 gggjhghjjgjhgjhgjhg hjgjhghjg jhg jhgjhgjh gjh hgjh </p>
          </div>
          <p class="centrado">
              <a class="btn waves-effect green">Reservar</a>
          </p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Campo',
  props: {
      id : Number
  },
    mounted: function () {
		this.$nextTick(function () {
            let elems = document.querySelectorAll('.materialboxed');
            let instances = M.Materialbox.init(elems, {});
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
    background-image : url("/Assets/img/background1.jpg");
    background-repeat : no-repeat;
    background-position: center;
    background-size : 100% auto;
}
</style>
