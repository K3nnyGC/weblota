<template>
    <div class="galeria izquierda">
        <h3 class="white-text chalk">Galeria {{canchita.name | min}}</h3>
        <div class="row">
            <div class="col s12 m10 offset-m1 l8 offset-l2 xl6 offset-xl3">
                <div class="card-panel">
                    <form @submit="enviar($event)">
                        <div class="row">
                        <div class="input-field col s12">
                            <div class="file-field input-field">
                                <div class="btn waves-effect green">
                                    <span>Imagen</span>
                                    <input type="file" id="file-upload" accept="image/*" @change="capturar($event)">
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path" type="text" id="texto">
                                </div>
                                <div id="file-preview-zone" class="img-contenedor">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12 center">
                            <input type="submit" value="Agregar" class="btn waves-effect green" :class="agregado && !load ? '' : 'disabled'">
                            </div>
                        </div>
                        <div class="row" v-if="load">
                            <div class="col s12 center">
                                <Loader></Loader>
                            </div>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s12 izquierda">
                <div class="row">
                    <transition-group name="list">
                    <div class="col s12 m6 l4 xl3"
                        v-for="item in canchita.gallery" :key=item.id
                    >
                        <Foto
                        v-bind:FotoObj = item
                        ></Foto>
                    </div>
                    </transition-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import Foto from "@/components/Foto.vue";
import {mapState,mapMutations} from "vuex";
import axios from "axios";
export default {
    name : "galeria",
    components : {
        Loader, Foto
    },
    data : function (){
        return {
            load : false,
            canchita :{},
            agregado : false,
            imagen : null
        }
    },
    computed : {
        ...mapState(['canchitaDef','usuario','logeado','api'])
    },
    methods : {
        ...mapMutations(['setCanchita']),
        capturar : function(e){
            let input = e.srcElement;
            if (input.files && input.files[0]) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    let filePreview = document.createElement('img');
                    filePreview.id = 'file-preview';
                    filePreview.src = e.target.result;
                    //console.log(e.target.result);
                    let previewZone = document.getElementById('file-preview-zone');
                    previewZone.innerHTML = "";
                    previewZone.appendChild(filePreview);
                }
                reader.readAsDataURL(input.files[0]);
                this.agregado = true;
            }
        },
        enviar : function(event){
            event.preventDefault();
            this.load = true;
            let formData = new FormData();
            let imagefile = document.querySelector('#file-upload');
            formData.append("photo", imagefile.files[0]);
            formData.append("court_soccer", this.canchita.id);
            axios({
                method: 'POST',
                url : this.api + '/api/gallery/',
                data:  formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Accept": "application/json, text/plain, */*",
                    "Authorization" : this.usuario.data.token_type + " " + this.usuario.data.access_token
                }
            })
            .then(
                response => {
                    this.load = false;
                    let c = this.canchita;
                    c.gallery.push(response.data);
                    this.setCanchita(c);
                    M.toast({html: "Foto agregada!"});
                    let previewZone = document.getElementById('file-preview-zone');
                    previewZone.innerHTML = "";
                    let texto = document.getElementById('texto');
                    texto.value = "";
                    this.agregado = false;
                }
            )
            .catch(error => {
                    this.load = false;
                    M.toast({html: "Ocurrió un error!"});
                }
            );
        }
    },
    created : function(){
        if(!this.logeado){
            this.$router.push("/");
        }
        if(this.canchitaDef == null){
            this.$router.push("/");
        } else {
            this.canchita = this.canchitaDef;
            console.log(this.canchita);
        }

    },
    mounted: function () {
		this.$nextTick(function () {
            //Setear listener para la imagen
            /*let fileUpload = document.getElementById('file-upload');
            fileUpload.onchange = function (e) {
                 
            }*/
		});
	}
}
</script>

<style scoped>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>


