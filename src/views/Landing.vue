<template>
  <div class="landing">
    <banner
      v-bind:imagen="banner1.imagen"
      v-bind:link="banner1.link"
      v-bind:stitulo="true"
      v-bind:sboton="true"
      v-bind:mensaje="banner1.mensaje"
    ></banner>

    <div class="container">
      <div class="section">
        <!--   Icon Section   -->
        <div class="row">
          <div class="col s12 m4">
            <div class="icon-block">
              <h2 class="center white-text">
                <i class="fal fa-map-marker-alt"></i>
              </h2>
              <h5 class="center white-text">Busca tu cancha</h5>

              <p
                class="light centrado white-text"
              >Tenemos a tus disposicion una gran cantidad de campos deportivos cerca a ti, los cuales estan esperando que los conozcas y disfrutes de sus instalaciones, divierte con tus amigos y demuestren lo que es un verdadero pelotero.</p>
            </div>
          </div>

          <div class="col s12 m4">
            <div class="icon-block">
              <h2 class="center white-text">
                <i class="fal fa-clock"></i>
              </h2>
              <h5 class="center white-text">Organiza tus tiempos</h5>

              <p
                class="light center white-text"
              >Contamos con infinidad de horarios los 7 días de la semana, elige el que mas se ajuste a tu rutina, mañana tarde y noche, siempre habrá una canchita disponible para ti y tus amigos.</p>
            </div>
          </div>

          <div class="col s12 m4">
            <div class="icon-block">
              <h2 class="center white-text">
                <i class="fab fa-paypal"></i>
              </h2>
              <h5 class="center white-text">Paga Seguro</h5>

              <p
                class="light center white-text"
              >Con nuestro método de pago seguro, olvídate del efectivo y paga desde la comodidad de tu hogar o centro de trabajo, con total confianza.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <banner
      v-bind:imagen="banner2.imagen"
      v-bind:stitulo="false"
      v-bind:sboton="false"
      v-bind:mensaje="banner2.mensaje"
    ></banner>

    <div class="container">
      <div class="section">
        <div class="row">
          <div class="col s12 center">
            <h4>Contact Us</h4>
            <p
              class="left-align light justificado white-text"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat. Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut ultricies eros. Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros. Morbi sem neque, posuere et pretium eget, bibendum sollicitudin lacus. Aliquam eleifend sollicitudin diam, eu mattis nisl maximus sed. Nulla imperdiet semper molestie. Morbi massa odio, condimentum sed ipsum ac, gravida ultrices erat. Nullam eget dignissim mauris, non tristique erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;</p>
          </div>
        </div>
      </div>
    </div>

    <banner
      v-bind:imagen="banner3.imagen"
      v-bind:stitulo="false"
      v-bind:sboton="false"
      v-bind:mensaje="banner3.mensaje"
    ></banner>
  </div>
</template>

<script>
// @ is an alias to /src
import Banner from "@/components/Banner.vue";

export default {
  name: "landing",
  components: {
    Banner
  },
  data() {
    return {
      banner1: {
        imagen: "/Assets/img/background1.jpg",
        link: "/search",
        mensaje: "Las mejores canchitas a un paso de distancia"
      },
      banner2: {
        imagen: "/Assets/img/background2.jpg",
        link: "#",
        mensaje: "los cancheros no se quedan atras! muesrta tu campo"
      },
      banner3: {
        imagen: "/Assets/img/background3.jpg",
        link: "#",
        mensaje: "Contactanos, siempre estamos encantados de saber de tí"
      }
    };
  },
  mounted : function(){
    this.$nextTick(function () {

    });
  }
};
</script>