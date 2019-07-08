<template>
    <div class="reservar">
        <div class="row">
            <div class="col s12">
                <h3 class="chalk izquierda white-text">Reservar</h3>
            </div>
            <div class="col s12">
                <div class="card-panel">
                    <table>
                        <thead>
                            <tr>
                                <th>Hora</th>
                                <th>Precio S/</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="i in intervalos" :key="i">
                                <td>{{mostrar((i-1)*gg)}}</td>
                                <td>80</td>
                                <td>
                                    <label>
                                        <input type="checkbox"  :id="'p'+i" />
                                        <span></span>
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <div class="card-panel">
                    <pre>
                        {{$data}}
                    </pre>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";
import axios from "axios";
export default {
    name : "Reserva",
    data : function(){
        return {
            load : false,
            hi : "06:15",
            hf : "22:00",
            intervalos : 28,
            gg : 30,
            valor : 0,
            generico : true,
            lista : [],
            checked : []
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
            this.salvarHorarios();
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
                }
            )
            .catch(error => {
                    this.load = false;
                    M.toast({html: "Ocurrió un error!"});
                }
            );
            
        },
        async salvarHorarios(){
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
            let mi = this.canchitaDef.start_time.split(":");
            let mf = this.canchitaDef.end_time.split(":");
            if(mi.length == 3 && mf.length == 3){
                this.hi = mi[0] + ":" + mi[1];
                this.hf = mf[0] + ":" + mf[1];
                this.intervalos = this.partir();
                this.bloqueado = true;
            }
        }
    }
}
</script>