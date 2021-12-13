<template>
    <div class="fm-table">
        <div class="row">
          <div class="table-content">
            <table class="table table-sm">
            <thead>
                <tr>
                    <th class="w-65" v-on:click="sortBy('name')">
                        {{ lang.manager.table.name }}
                        <template v-if="sortSettings.field === 'name'">
                            <i class="fas fa-sort-amount-down"
                               v-show="sortSettings.direction === 'down'"/>
                            <i class="fas fa-sort-amount-up"
                               v-show="sortSettings.direction === 'up'"/>
                        </template>
                    </th>
                    <th class="w-10" v-on:click="sortBy('size')">
                        {{ lang.manager.table.size }}
                        <template v-if="sortSettings.field === 'size'">
                            <i class="fas fa-sort-amount-down"
                               v-show="sortSettings.direction === 'down'"/>
                            <i class="fas fa-sort-amount-up"
                               v-show="sortSettings.direction === 'up'"/>
                        </template>
                    </th>
                    <th class="w-10" v-on:click="sortBy('type')">
                        {{ lang.manager.table.type }}
                        <template v-if="sortSettings.field === 'type'">
                            <i class="fas fa-sort-amount-down"
                               v-show="sortSettings.direction === 'down'"/>
                            <i class="fas fa-sort-amount-up"
                               v-show="sortSettings.direction === 'up'"/>
                        </template>
                    </th>
                    <th class="w-auto" v-on:click="sortBy('date')">
                        {{ lang.manager.table.date }}
                        <template v-if="sortSettings.field === 'date'">
                            <i class="fas fa-sort-amount-down"
                               v-show="sortSettings.direction === 'down'"/>
                            <i class="fas fa-sort-amount-up"
                               v-show="sortSettings.direction === 'up'"/>
                        </template>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="!isRootPath">
                    <td colspan="4" class="fm-content-item" v-on:click="levelUp">
                        <i class="fas fa-level-up-alt"/>
                    </td>
                </tr>
                <tr v-for="(directory, index) in directories"
                    v-bind:key="`d-${index}`"
                    v-bind:class="{'table-info': checkSelect('directories', directory.path)}"
                    v-on:click="selectItem('directories', directory.path, $event)"
                    v-on:contextmenu.prevent="contextMenu(directory, $event)">
                    <td class="fm-content-item unselectable"
                        v-bind:class="(acl && directory.acl === 0) ? 'text-hidden' : ''"
                        v-on:dblclick="selectDirectory(directory.path)">
                        <i class="far fa-folder"/> {{ directory.basename }}
                    </td>
                    <td>{{ lang.manager.table.folder }}</td>
                    <td>
                        {{ timestampToDate(directory.timestamp) }}
                    </td>
                </tr>
                <tr v-for="(file, index) in files"
                    v-bind:key="`f-${index}`"
                    v-bind:class="{'table-info': checkSelect('files', file.path)}"
                    v-on:click="selectItem('files', file.path, $event)"
                    v-on:dblclick="selectAction(file.path, file.extension)"
                    v-on:contextmenu.prevent="contextMenu(file, $event)">
                    <td class="fm-content-item bdf_element unselectable"
                        v-bind:class="(acl && file.acl === 0) ? 'text-hidden' : ''">
                        <!-- <a href="#" onclick="window.open('file', '_blank', 'fullscreen=yes'); return false;"> -->
                        <i class="far" v-bind:class="extensionToIcon(file.extension)"/>
                        {{ file.filename ? file.filename : file.basename }}
                        <!-- </a> -->
                    </td>
                    <!-- <td>{{ bytesToHuman(file.size) }}</td> -->
                    <td>
                        {{ file.extension }}
                    </td>
                    <td>
                        {{ timestampToDate(file.timestamp) }}
                    </td>
                </tr>
            </tbody>
           </table>
          </div>
        </div>
    </div>
</template>
<script>
import translate from '../../mixins/translate';
import helper from '../../mixins/helper';
import managerHelper from './mixins/manager';
// import GET from '../../http/get';
// import modal from '../mixins/modal';

export default {
  name: 'table-view',
  mixins: [translate, helper, managerHelper],
  props: {
    manager: { type: String, required: true },
  },
  data() {
    return {
      selectedFile: '',
      pdfFile: '',
      filePath: '',
    };
  },
  mounted() {
    this.$root.$on('eventName', (payload) => {
      console.log('Received message', payload);
      this.selectedFile = payload.message;
      console.log('this.selectedFile2  = ', this.selectedFile);
    });
  },
  computed: {
    /**
     * Sort settings
     * @returns {*}
     */
    sortSettings() {
      return this.$store.state.fm[this.manager].sort;
    },
    /**
     * Selected disk
     * @returns {*}
     */
    selectedDisk() {
      return this.$store.getters['fm/selectedDisk'];
    },
    selectedItem() {
      return this.$store.getters['fm/selectedItems'][0];
    },
  },
  methods: {
    /**
     * Sort by field
     * @param field
     */
    sortBy(field) {
      this.$store.dispatch(`fm/${this.manager}/sortBy`, { field, direction: null });
    },
    /**
     * Show modal window
     * @param modalName
     */
    showModal(modalName) {
      // show selected modal
      this.$store.commit('fm/modal/setModalState', {
        modalName,
        show: true,
      });
    },
    // v-on:dblclick="selectingFile(file)"
    // selectingFile(file) {
    //   console.log('file.path', file.path);
    //   if (file.path === 'pdf') {
    //     this.pdfFile = `${this.$store.getters['fm/settings/baseUrl']}openPDF?disk=${this.selectedDisk}&path=${encodeURIComponent(this.selectedItem.path)}`;
    //   }
    //   this.$store.commit('fm/setFileCallBack', function (fileUrl) {
    //     console.log('fileUrl = ', fileUrl);
    //     console.log(`${fileUrl}`);
    //     // window.location.replace(fileUrl);
    //   });
    // },
  },
};
</script>

<style lang="scss">
.table-content{
    width: 100% !important;
}
.displayedPdf{
    width: 70% !important;
}
    .fm-table {

        thead th{
            background: white;
            position: sticky;
            top: 0;
            z-index: 10;
            cursor: pointer;
            border-top: none;

            &:hover {
                background-color: #f8f9fa;
            }

            & > i {
                padding-left: 0.5rem;
            }
        }

        td {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        tr:hover {
            background-color: #f8f9fa;
        }

        .w-10 {
            width: 10%;
        }

        .w-65 {
            width: 65%;
        }

        .fm-content-item {
            cursor: pointer;
            max-width: 1px;
        }

        .text-hidden {
            color: #cdcdcd;
        }
    }
.fm-content .fm-content-body{
    overflow: visible !important;
}
</style>
