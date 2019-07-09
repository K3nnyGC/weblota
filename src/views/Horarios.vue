<template>
    <div class="horarios vacio">
        <div class="row">
            <div class="col s12 center" v-if="cargando">
                <Loader></Loader>
            </div>
        </div>
        <transition
            name="custom-classes-transition"
            enter-active-class="animated slideInUp"
            leave-active-class="animated bounceOutRight"
        >
        <div class="row" v-show="!cargando">
            <div class="col s12 izquierda">
                <h3 class="white-text chalk">Canchita: {{nombre | min}}</h3>
            </div>
            <div class="col s12 m6 l4" v-if="!bloqueado">
                <div class="card-panel h620 hoverable">
                    <h3 class="izquierda">Detalles</h3>
                    <div class="row">
                        <form @submit="enviarLimites($event)">
                        <div class="col s12">
                            <p class="justificado grey-text">Canchita</p>
                            <input type="text" :value="nombre" disabled>
                        </div>
                        <div class="col s12">
                            <p class="justificado grey-text">Hora de inicio</p>
                            <input type="text" class="timepicker manito" @keypress="nulo($event)" v-model="hi" @change="pri($event)" id="fe1">
                        </div>
                        <div class="col s12">
                            <p class="justificado grey-text">Hora de fin</p>
                            <input type="text" class="timepicker manito" @keypress="nulo($event)" v-model="hf" @change="pri($event)" id="fe2">
                        </div>
                        <div class="col s12">
                            <p class="justificado grey-text">Tiempo de alquiler</p>
                            <select class="browser-default" v-model="gg" @change="pri($event)">
                                <option value=30>30 minutos</option>
                                <option value=45>45 minutos</option>
                                <option value=60>60 minutos</option>
                            </select>
                        </div>
                        <div class="col s12 center">
                            <br>
                            <input type="submit" class="btn waves-effect green" value="Crear Horario" :class="[load ? 'disabled' : '']">
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col s12 m6 l4" v-if="bloqueado">
                <div class="card-panel h620 hoverable">
                    <div class="switch right">
                        <label>
                        Detallado
                        <input type="checkbox" v-model="generico" @change="generar()">
                        <span class="lever green"></span>
                        Genérico
                        </label>
                    </div>
                    <h3 class="izquierda">Precio</h3>
                    <div class="row" v-if="generico">
                        <div class="input-field col s12">
                            <input id="valor" type="number" class="validate" v-model="valor">
                            <label for="valor" :class="[valor >= 0 ? 'active' : '']">Precio</label>
                        </div>
                    </div>
                    <transition
                        name="fade"
                        mode="out-in"
                    >
                    <div class="tabla" v-show="!generico">
                        <table>
                            <thead>
                                <tr>
                                    <th>Hora</th>
                                    <th>Precio S/</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="i in intervalos" :key="i">
                                    <td>{{mostrar((i-1)*gg)}}</td>
                                    <td><input type="number" min=0 max=300 step=10 class="resetInput" :id="'int'+i" @change="colectar()"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </transition>
                </div>
            </div>
            <div class="col s12 m6 l4">
                <div class="card-panel h620 hoverable" v-if="bloqueado">
                    <h3 class="izquierda">Resumen</h3>
                    <table>
                        <tr><th>Apertura</th><td>{{hi}}</td></tr>
                        <tr><th>Cierre</th><td>{{hf}}</td></tr>
                        <tr><th>Cupos</th><td>{{lista.length}}</td></tr>
                        <tr><th>Tiempo</th><td>{{gg}} min</td></tr>
                        <tr v-if="generico"><th>Precio regular</th><td>S/ {{valor}}</td></tr>
                        <tr><th>Precio detallado</th><td>{{!generico ? "Si" : "No"}}</td></tr>
                    </table>
                    <div class="row">
                        <div class="col s12 center">
                            <br>
                            <a class="btn waves-effect green" @click="enviarConjunto()" :class="[load ? 'disabled' : '']">Registrar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </transition>
        <!--<div>
            <pre class="izquierda">
                {{$data}}
            </pre>
        </div>-->
    </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";
import Loader from "@/components/Loader.vue";
import axios from "axios";
export default {
    name : "Horario",
    components : {
        Loader
    },
    data : function(){
        return {
            load : false,
            hi : "",
            hf : "",
            intervalos : 0,
            gg : 30,
            valor : 0,
            generico : true,
            lista : [],
            bloqueado : false,
            cargando : true
        }
    },
    computed : {
        ...mapState(["usuario","logeado","canchitaDef","api"]),
        nombre : function(){
            if(this.canchitaDef != null ) return this.canchitaDef.name;
            return "";
        }
    },
    methods : {
        nulo : function(event){
            event.preventDefault();
        },
        pri : function(event){
            let t1 = document.getElementById('fe1').value;
            let t2 = document.getElementById('fe2').value;
            this.hi = is.timeString(t1 + ":00") ? this.redondear(t1) : "";
            this.hf = is.timeString(t2 + ":00") ? this.redondear(t2) : "";
            this.intervalos = this.partir();
        },
        redondear : function(cadena){
            let arreglo = cadena.split(":");
            if (arreglo.length == 2){
                let a = parseInt(arreglo[1]);
                let x = a - (a % 15);
                return this.formato(arreglo[0]) + ":" + this.formato(x);
            } else {
                return "";
            }
        },
        formato : function(num){
            let st = num + "";
            let vm = parseInt(st);
            if(vm < 10) return "0" + vm;
            return "" + vm;
        },
        partir : function(){
            let m1 = this.hi.split(":");
            let m2 = this.hf.split(":");
            if(m1.length == 2 && m2.length == 2){
                let dif = parseInt(m2[0])*60 + parseInt(m2[1]) - parseInt(m1[0])*60 - parseInt(m1[1]);
                if( dif >= 0){
                    return Math.floor(dif / this.gg);
                } else {
                    return Math.floor((24*60 + dif) / this.gg);
                }
            } else {
                return 0;
            }
        },
        mostrar(c){
            let num = parseInt(c);
            let hora = ((c - (c % 60)) / 60) + parseInt(this.hi.split(":")[0]);
            let minuto = (c % 60) + parseInt(this.hi.split(":")[1]);
            if (minuto >= 60) {hora = hora + 1;minuto = minuto-60;}
            if (hora > 23) {hora = hora - 24;}
            return this.formato(hora) + ":" + this.formato(minuto);
        },
        enviarLimites : function(event){
            event.preventDefault();
            this.load = true;
            this.updateCancha();
        },
        colectar : function(){
            let set = [];
            for(let i = 1; i < this.intervalos; i++){
                let valor = parseInt(document.getElementById("int"+i).value);
                if(valor > 0){
                    set.push(
                        {
                            court_soccer : this.canchitaDef.id,
                            start_time : this.mostrar((i-1)*this.gg)+":00",
                            end_time : this.mostrar((i)*this.gg)+":00",
                            price : valor,
                            duration : this.gg
                        }
                    );
                }
            }
            console.log(set);
            this.lista = set;
        },
        generar : function(){
            let set = [];
            if(parseInt(this.valor) > 0 ){
                for(let i = 1; i < this.intervalos; i++){
                    set.push(
                            {
                                court_soccer : this.canchitaDef.id,
                                start_time : this.mostrar((i-1)*this.gg)+":00",
                                end_time : this.mostrar((i)*this.gg)+":00",
                                price : parseInt(this.valor),
                                duration : this.gg
                            }
                        );
                }
            }
            
            this.lista = set;
        },
        enviarConjunto : function(){
            if(this.generico){
                this.generar();
            } else {
                this.colectar();
            }
            if(this.lista.length > 0){
                this.salvarHorarios();
            } else {
                M.toast({html: "No hay precios registrados!"});
            }
            
        },
        //metodos ajax
        async updateCancha(){
            axios({
                method: 'PUT',
                url : this.api + '/api/court-soccer/' + this.canchitaDef.id + '/',
                data: {
                    "start_time" : this.hi + ":00",
                    "end_time" : this.hf + ":00"
                },
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json, text/plain, */*",
                    "Authorization" : this.usuario.data.token_type + " " + this.usuario.data.access_token
                }
            })
            .then(
                response => {
                    this.load = false;
                    M.toast({html: "Actualizado!"});
                    this.bloqueado = true;
                }
            )
            .catch(error => {
                    this.load = false;
                    M.toast({html: "Ocurrió un error!"});
                }
            );
            
        },
        async salvarHorarios(){
            this.load = true;
            axios({
                method: 'POST',
                url : this.api + '/api/schedule/',
                data: this.lista,
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json, text/plain, */*",
                    "Authorization" : this.usuario.data.token_type + " " + this.usuario.data.access_token
                }
            })
            .then(
                response => {
                    this.load = false;
                    M.toast({html: "Actualizado!"});
                    this.$router.push("/canchitas");
                }
            )
            .catch(error => {
                    this.load = false;
                    M.toast({html: "Ocurrió un error!"});
                }
            );
            
        },
        async recuperarHoras(){
            this.load = true;
            axios({
                method: 'GET',
                url : this.api + '/api/schedule/'+this.canchitaDef.id+'/',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json, text/plain, */*",
                    "Authorization" : this.usuario.data.token_type + " " + this.usuario.data.access_token
                }
            })
            .then(
                response => {
                    this.load = false;
                    if(response.data.length > 0){
                        M.toast({html: "Ya estan las horas registradas!"});
                        //this.$router.push("/canchitas");
                        this.$router.go(-1);
                    } else {
                        this.cargando = false;
                    }
                    //M.toast({html: "Actualizado!"});
                    //this.$router.push("/canchitas");
                    //console.log(response.data);
                }
            )
            .catch(error => {
                    this.load = false;
                    M.toast({html: "Ocurrió un error al recuperar!"});
                }
            );
            
        }
    },
    created : function(){
        if(this.canchitaDef == null){
            this.$router.push("/");
        }
    },
    mounted : function(){
        var elems = document.querySelectorAll('.timepicker');
        var instances = M.Timepicker.init(elems, {"twelveHour":false});
        if(!this.logeado){
            this.$router.push("/login");
            M.toast({html: "Debes estar logeado!"});
        } else {
            let mi = this.canchitaDef.start_time ? this.canchitaDef.start_time.split(":") : [];
            let mf = this.canchitaDef.end_time ? this.canchitaDef.end_time.split(":") : [];
            if(mi.length == 3 && mf.length == 3){
                this.hi = mi[0] + ":" + mi[1];
                this.hf = mf[0] + ":" + mf[1];
                this.intervalos = this.partir();
                this.bloqueado = true;
            }
        }
        this.recuperarHoras();
    }
}
</script>

<style scoped>
    .manito{
        cursor : pointer;
    }
    .resetInput{
        border: none !important;
        margin: 0 !important;
        box-shadow: none !important;
    }
    td {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
    }
    .h620{
        height: 680px !important;
    }
    .tabla{
        overflow-y: auto;
        max-height: 500px;
        border: 6px #f1f1f1 solid;
        padding: 10px;
        border-radius: 5px;
    }
</style>


