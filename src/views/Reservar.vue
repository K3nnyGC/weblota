<template>
    <div class="reservar">
        <div class="row vacio">
            <div class="col s12">
                <h3 class="chalk izquierda white-text">Reservar</h3>
            </div>
            <div class="col s12 m10 l8 xl6 offset-m1 offset-l2 offset-xl3">
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
                            <tr v-for="item in rango" :key="item.num">
                                <td>{{item.canchita.start_time}}</td>
                                <td>{{item.canchita.price}}</td>
                                <td>
                                    <!--<label>
                                        <input type="checkbox"  :id="'p'+index" />
                                        <span></span>
                                    </label>-->
                                    <a class="btn waves-effect green white-text"
                                    :class="[item.reservado || load ? 'disabled' : '']"
                                     href="#modal"
                                     @click="reservar(item)"
                                    >{{item.reservado ? 'Ocupado' : 'Reservar'}}</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div id="modal" class="modal blacksoft white-text bottom-sheet">
            <div class="modal-content blacksoft-text izquierda padre">
                <h3 class="chalk white-text">Pago</h3>
                <table class="white-text">
                    <tr><th>Precio</th><td>{{apagar.canchita.price}}</td></tr>
                    <tr><th>Hora</th><td>{{apagar.canchita.start_time}} x {{apagar.canchita.duration}} minutos</td></tr>
                    <tr><th>Tarjeta</th>
                        <td>
                            <div class="row tarjeta padre">
                                <div class="input-field col s12">
                                    <input id="card" type="text" class="validate" v-model.trim="card.numero">
                                    <label for="card" :class="[card.numero != '' ? 'active' : '']">Número</label>
                                </div>
                                <div class="input-field col s4">
                                    <input id="cvv" type="text" class="validate" v-model.trim="card.cvv">
                                    <label for="cvv" :class="[card.cvv != '' ? 'active' : '']">CVV</label>
                                </div>
                                <div class="input-field col s4">
                                    <input id="mes" type="text" class="validate" v-model.trim="card.mes">
                                    <label for="mes" :class="[card.mes != '' ? 'active' : '']">Mes</label>
                                </div>
                                <div class="input-field col s4">
                                    <input id="anio" type="text" class="validate" v-model.trim="card.anio">
                                    <label for="anio" :class="[card.anio != '' ? 'active' : '']">Año</label>
                                </div>
                                <div class="barra hijo"></div>
                            </div>
                        </td>
                    </tr>
                </table>
                <a class="btn waves-effect gren" @click="pagar(apagar)" :class="[load ? 'disabled' : '']">Pagar</a>
                <a class="btn-floating btn-large waves-effect waves-light amber hijo cerrar z-depth-3 modal-close">
                    <i class="fal fa-times blacksoft-text"></i>
                </a>
            </div>
            <!--<div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
            </div>-->
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
            hf : "23:00",
            intervalos : 28,
            gg : 30,
            valor : 0,
            generico : true,
            lista : [],
            checked : [],
            rango : [],
            horarios : [],
            apagar : {
                price : "",
                start_time : "",
                duration : "",
                item : {},
                canchita : {
                    price : "",
                    start_time : "",
                    duration : "",
                    item : {},
                }
            },
            card : {
                numero : "",
                cvv : "",
                mes : "",
                anio : ""
            }
        }
    },
    computed : {
        ...mapState(["usuario","logeado","canchitaDef","api"]),
        nombre : function(){
            if(this.canchitaDef != null ) return this.canchitaDef.name;
            return "";
        },
        hoy : function(){
            let hoy = new Date();
            var dd = this.formato(hoy.getDate());
            var mm = this.formato(hoy.getMonth()+1);
            var yyyy = hoy.getFullYear();
            return yyyy +"-"+mm+"-"+dd;
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
            
            this.lista = set;
            this.salvarHorarios();
        },
        asignar : function(){
            this.rango = [];
            
            for(let i = 0; i < this.intervalos; i++){
                let ini = this.mostrar((i-1)*this.gg) + ":00";
                let s = false;
                let o = null;
                
                for(let j=0;j<this.horarios.length;j++){
                    let a = new Date();
                    let b = a.getHours()*60 + a.getMinutes();
                    let c = this.horarios[j].start_time.split(":")[0]*60+parseInt(this.horarios[j].start_time.split(":")[1]);
                    c = 1; b=0;
                    //console.log(this.horarios[j].start_time)
                    //console.log("c",c,"b",b,c>b);
                    if(this.horarios[j].start_time == ini && c > b){
                        s = true;
                        o = this.horarios[j];
                        j = this.horarios.length;
                    }
                }
                if(s){
                    this.rango.push({
                        num : i,
                        canchita : o,
                        reservado : false
                    });
                }
            }
            if(this.rango.length > 0){
                this.gg = this.rango[0].canchita.duration;
            } else {
                M.toast({html: "Esta cancha aun no se puede reservar!"});                this.$router.go(-1);
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
                        this.horarios = response.data;
                        //M.toast({html: "Ya estan las horas registradas!"});
                        //this.$router.push("/canchitas");
                        //this.$router.go(-1);
                        this.asignar();
                    } else {
                        //this.cargando = false;
                    }
                    //M.toast({html: "Actualizado!"});
                    //this.$router.push("/canchitas");
                }
            )
            .catch(error => {
                    this.load = false;
                    M.toast({html: "Ocurrió un error al recuperar!"});
                }
            );
            
        },
        async reservar(item){
            this.load = true;
            axios({
                method: 'POST',
                url : this.api + '/api/reserve/',
                data: {
                    schedule : item.canchita.id,
                    reserve_day : this.hoy
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
                    //item.reservado = true;
                    this.apagar = item;
                    console.log("apagar",this.apagar);
                    M.toast({html: "Iniciando pago!"});
                    var elems = document.querySelectorAll('.modal');
                    var instance = M.Modal.getInstance(elems[0]);
                    instance.open();
                }
            )
            .catch(error => {
                    this.load = false;
                    M.toast({html: "El módulo de pagos no esta disponible!"});
                }
            );
            
        },
        async pagar(item){
            this.load = true;
            console.log(item);
            axios({
                method: 'POST',
                url : this.api + '/api/order/',
                data: {
                    card_number : this.card.numero,
                    exp_month : this.card.mes,
                    exp_year : this.card.anio,
                    cvv : this.card.cvv,
                    address : "vvv",
                    address_city : "LIMA",
                    total : item.canchita.price,
                    phone_number : "98879887",
                    product_description : "Reserva de cancha",
                    payment_type : 1,
                    reserve : 1
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
                    item.reservado = true;
                    //console.log(this.apagar);
                    M.toast({html: "Reservado"});
                    var elems = document.querySelectorAll('.modal');
                    var instance = M.Modal.getInstance(elems[0]);
                    instance.close();
                }
            )
            .catch(error => {
                    this.load = false;
                    M.toast({html: "El módulo de pagos no esta disponible!"});
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
            if(this.canchitaDef.start_time){
                let mi = this.canchitaDef.start_time.split(":");
                let mf = this.canchitaDef.end_time.split(":");
                if(mi.length == 3 && mf.length == 3){
                    this.hi = mi[0] + ":" + mi[1];
                    this.hf = mf[0] + ":" + mf[1];
                    //this.gg = this.canchitaDef.duration;
                    this.intervalos = this.partir();
                    this.bloqueado = true;
                }
            } else {
                M.toast({html: "Esta cancha aun no se puede reservar!"});                this.$router.go(-1);
            }
        }
        this.recuperarHoras();
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {});
    }
}
</script>

<style scoped>
    .tarjeta{
        background-color: #607D8B;
        min-height: 260px;
        max-width: 400px;
        border-radius: 5px;
    }
    .barra{
            min-height: 50px;
            position: absolute;
            bottom: 16px;
            background-color: black;
            width: 100%;
    }
</style>
