<template>
    <div id="index-banner" class="parallax-container valign-wrapper">
        <div class="section no-pad-bot">
            <div class="container">
                <br><br>
                <h1 v-if="stitulo" class="header center green-text text-lighten-2 textoVerde">Weblota</h1>
                <div class="row center">
                    <h5 class="header col s12 light textoBlanco">{{mensaje}}</h5>
                </div>
                <div v-if="sboton" class="row center">
                    <router-link :to="link" class="btn-large waves-effect waves-light green lighten-1 disabled">Busquemos canchitas <i class="fal fa-search"></i></router-link>
                </div>
                <br><br>
            </div>
        </div>
        <div class="parallax">
            <img :src="imagen" alt="Unsplashed background img 1">
        </div>
    </div>
</template>

<script>
export default {
    name : 'Banner',
    props : {
        imagen : String,
		link : String,
		stitulo : Boolean,
		sboton : Boolean,
		mensaje : String

    },
	data: function () {
	    	return {
	    		count: 0
	    	}
    },
    mounted: function () {
		this.$nextTick(function () {
			let elems = document.querySelectorAll('.parallax');
            let instances = M.Parallax.init(elems, {responsiveThreshold : 400});
		})
	}
}
</script>

<style scoped>
    .textoVerde{
        text-shadow: 0 0 4px lime, 0 0 2px black;
    }
    .textoBlanco{
        text-shadow: 0 0 2px black;
    }
</style>


