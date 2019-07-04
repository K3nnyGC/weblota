<template>
    <!-- Modal Structure -->
    <div :id="'modal'+id" class="modal  bottom-sheet">
        <div class="modal-content blacksoft-text izquierda">
            <h4>{{obj.name}}</h4>
            <p>{{obj.gallery[0].photo}}</p>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
    </div>
</template>

<script>
export default {
    data : function(){
        return {
        }
    },
    props : {
        id : Number,
        obj : Object
    }
}
</script>

