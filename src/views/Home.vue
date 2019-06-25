<template>
  <div class="search">
        <div class="row">
            <div class="col s12 m10 offset-m1 l6 xl4">
                <div class="justificado">Departamento</div>
                <select class="browser-default" :disabled="departamentos.length == 0" @change="cambiarDep" v-model="departamento">
                    <option :value="item" v-for="(item,key) in departamentos" :key=key>{{item.Nombre}}</option>
                </select>
            </div>
            <div class="col s12 m10 offset-m1 l6 xl4">
                <div class="justificado">Provincia</div>
                <select class="browser-default" :disabled="provincias.length == 0" @change="cambiarProv" v-model="provincia">
                    <option :value="item" v-for="(item,key) in provincias" :key=key>{{item.Nombre}}</option>
                </select>
            </div>
            <div class="col s12 m10 offset-m1 l6 xl4">
                <div class="justificado">Distrito</div>
                <select class="browser-default" :disabled="distritos.length == 0" v-model="distrito">
                    <option :value="item" v-for="(item,key) in distritos" :key=key>{{item.Nombre}}</option>
                </select>
            </div>
        </div>  
    <div class="row">
        <div class="col s12 m10 offset-m1 l6 xl4"
            v-for="item in 10"
            :key=item
        >
            <Campo
             :id = "item"
            ></Campo>
        </div>
    </div>
    <div class="center">
      <pre>{{$data}}</pre>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Campo from '@/components/Campo.vue'
import axios from "axios";

export default {
  name: 'home',
  components: {
    Campo
  },
  data : function(){
    return {
      departamentos : [],
      provincias : [],
      distritos : [],
      departamento : null,
      provincia : null,
      distrito : null
    }
  },
  methods : {
    async getDep(){
            let salida = await axios.get('http://ubigeows.somee.com/api/ubigeo');
            this.departamentos = await salida.data;
            this.departamento = await salida.data[0];
        },
    cambiarDep: function(){
      this.provincias = [];
      this.distritos = [];
        if(this.departamento.IdDepartamento !== "00"){
            this.getProv();
        }
    },
    async getProv(){
            let salida = await axios.get('http://ubigeows.somee.com/api/ubigeo/'+this.departamento.IdDepartamento);
            this.provincias = await salida.data;
            this.provincia = await salida.data[0];
        },
    cambiarProv: function(){
            this.getDist();
    },
    async getDist(){
            let salida = await axios.get('http://ubigeows.somee.com/api/ubigeo/'+this.departamento.IdDepartamento+"/"+this.provincia.IdProvincia);
            this.distritos = await salida.data;
            this.distrito = await salida.data[0];
        },
  },
	mounted: function () {
		this.$nextTick(function () {
      this.getDep();
		});
	}
}
</script>
