<template>
    <div class="modal-content fm-modal-upload">
        <div class="modal-header">
            <h5 class="modal-title text-muted h5">
               {{ lang.modal.preview.title }}
                <small class="text-muted pl-3">{{ selectedItem.basename }}</small>
            </h5>
            <button type="button" class="close" aria-label="Close" v-on:click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
        <div id="displayedHere">
        <iframe v-bind:src="pdfFile" width="100%" height="900px"></iframe>
        </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-light" v-on:click="selectingFile()">show</button>
            <button class="btn btn-light" v-on:click="hideModal()">{{ lang.btn.cancel }}</button>
        </div>
    </div>
</template>

<script>
import modal from '../mixins/modal';
import translate from '../../../mixins/translate';
import helper from '../../../mixins/helper';
import GET from '../../../http/get';
// import TableView from '../../manager/TableView.vue';

export default {
  name: 'openPDF',
  mixins: [modal, translate, helper],
  data() {
    return {
      pdfFile: '',
    };
  },
  created() {
    this.selectingFile();
  },
  computed: {
    auth() {
      return this.$store.getters['fm/settings/authHeader'];
    },
    selectedDisk() {
      return this.$store.getters['fm/selectedDisk'];
    },
    selectedItem() {
      return this.$store.getters['fm/selectedItems'][0];
    },
  },
  methods: {
    selectingFile() {
      // this.pdfFile = `${this.$store.getters['fm/settings/baseUrl']}openPDF?disk=${this.selectedDisk}&path=${encodeURIComponent(this.selectedItem.path)}`;
      // console.log('fileCallback =', this.pdfFile);
      // if authorization required
      if (this.auth) {
        GET.openPDF(
          this.selectedDisk,
          this.selectedItem.path,
        ).then((response) => {
          // const mimeType = response.headers['content-type'].toLowerCase();
          // const imgBase64 = Buffer.from(response.data, 'binary').toString('base64');
          console.log('response.data = ', response.data);
          this.pdfFile = `${this.$store.getters['fm/settings/baseUrl']}openPDF?disk=${this.selectedDisk}&path=${encodeURIComponent(this.selectedItem.path)}`;
        });
      } else {
        this.pdfFile = `${this.$store.getters['fm/settings/baseUrl']}openPDF?disk=${this.selectedDisk}&path=${encodeURIComponent(this.selectedItem.path)}`;
      }
    },
  },
};
</script>

<style lang="scss">
</style>
