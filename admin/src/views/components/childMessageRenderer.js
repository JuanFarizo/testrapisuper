import Vue from "vue";

export default Vue.extend({
    template: `
        <span>
            <button v-on:click="apreteboton" class="btn btn-info">Invoke Parent</button>
        </span>
    `,
    data: function () {
        return {
        };
    },
    beforeMount() {
    },
    mounted() {
    },
    methods: {
      apreteboton() {
        console.log('todo bien');
          // this.params.context.componentParent.methodFromParent(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`)
      }
    }
});
