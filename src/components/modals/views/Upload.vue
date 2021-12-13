<template>
    <div class="modal-content fm-modal-upload">
        <div class="modal-header">
            <h5 class="modal-title text-muted h5">{{ lang.modal.upload.title }}</h5>
            <button type="button" class="close" aria-label="Close" v-on:click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="fm-btn-wrapper" v-show="!progressBar">
                <button type="button" class="btn btn-primary btn-block">
                    {{ lang.btn.uploadSelect }}
                </button>
                <input type="file" multiple="multiple" ref="file" name="myfile" @change="selectFiles($event)">
            </div>
            <div class="fm-upload-list" v-if="countFiles">
                <div v-for="(item, index) in selectedFiles"
                     v-bind:key="index">
                    <div class="d-flex justify-content-between mt-3">
                    <div class="w-75 text-truncate">
                        <i class="far" v-bind:class="mimeToIcon(item.type)"/>
                        {{ item.name }}
                    </div>
                    <div class="text-right">
                        {{ bytesToHuman(item.size) }}
                    </div>
                    <div class="meta-data">
                      <i class="fas fa-plus text-primary" v-on:click="metaDataDesc(index)"></i>
                    </div>
                    </div>
                    <div v-bind:id="index" class="meta-data-disc d-none">
                         <div class="d-flex">
                         <textarea class="w-75 border border-1 p-2" id="desc_input" v-model="metaData[index].text" placeholder="Enter Description"></textarea>
                         <div class="w-25">
                         <select name="meta-data" v-model="metaData[index].select" class="w-100 border border-1 p-1" id="meta-data">
                           <option value="A">A</option>
                           <option value="B">B</option>
                           <option value="C">C</option>
                         </select>
                         </div>
                         </div>
                    </div>
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                    <div>
                        <strong>{{ lang.modal.upload.selected }}</strong>
                        {{ newFiles.length }}
                    </div>
                    <div class="text-right">
                        <strong>{{ lang.modal.upload.size }}</strong>
                        {{ allFilesSize }}
                    </div>
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                    <div>
                        <strong>{{ lang.modal.upload.ifExist }}</strong>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input"
                               id="uploadRadio1"
                               type="radio"
                               name="uploadOptions"
                               value="0"
                               checked
                               v-model="overwrite">
                        <label class="form-check-label" for="uploadRadio1">
                            {{ lang.modal.upload.skip }}
                        </label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input"
                               id="uploadRadio2"
                               type="radio"
                               name="uploadOptions"
                               value="1"
                               checked
                               v-model="overwrite">
                        <label class="form-check-label" for="uploadRadio2">
                            {{ lang.modal.upload.overwrite }}
                        </label>
                    </div>
                </div>
                <hr>
            </div>
            <div v-else><p>{{ lang.modal.upload.noSelected }}</p></div>
            <div class="fm-upload-info">
                <!-- Progress Bar -->
                <div class="progress" v-show="countFiles">
                    <div class="progress-bar progress-bar-striped bg-info" role="progressbar"
                         v-bind:aria-valuenow="progressBar"
                         aria-valuemin="0"
                         aria-valuemax="100"
                         v-bind:style="{width: progressBar + '%' }">
                        {{ progressBar }}%
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn"
                    v-bind:class="[countFiles ? 'btn-info' : 'btn-light']"
                    v-bind:disabled="!countFiles"
                    v-on:click="uploadFiles">{{ lang.btn.submit }}
            </button>
            <button class="btn btn-light" v-on:click="hideModal()">{{ lang.btn.cancel }}</button>
        </div>
    </div>
</template>

<script>
import modal from '../mixins/modal';
import translate from '../../../mixins/translate';
import helper from '../../../mixins/helper';

export default {
  name: 'Upload',
  mixins: [modal, translate, helper],
  data() {
    return {
      // selected files
      newFiles: [],
      events: [],
      selectedFiles: [],
      index: 0,
      // overwrite if exists
      overwrite: 0,
      isActive: [false],
      metaData: [],
    };
  },
  created() {
    this.allFilesElem();
    this.isActive.fill(false);
  },
  computed: {

    /**
     * Progress bar value - %
     * @returns {number}
     */
    progressBar() {
      return this.$store.state.fm.messages.actionProgress;
    },

    /**
     * Count of files selected for upload
     * @returns {number}
     */
    countFiles() {
      return this.newFiles.length;
    },

    /**
     * Calculate the size of all files
     * @returns {*|string}
     */
    allFilesSize() {
      let size = 0;

      for (let i = 0; i < this.newFiles.length; i += 1) {
        size += this.newFiles[i].size;
      }

      return this.bytesToHuman(size);
    },

  },
  methods: {
    /**
     * Select file or files
     * @param event
     */
    selectFiles(event) {
      // files selected?
      if (event.target.files.length === 0) {
        // no file selected
        this.newFiles = [];
      } else {
        let i = 0;
        // we have file or files
        this.newFiles = event.target.files;
        this.events = event;
        this.metaData.push({text:'',select:''});
        this.selectedFiles.push(this.newFiles[i]);
        i += 1;
        this.$root.$emit('eventName', { message: this.overwrite });
      }
    },
    metaDataDesc(index) {
      const myElem = document.getElementById(index);
      myElem.classList.toggle('d-block');
      // myElem.classList.add('d-block');
      // if (!this.isActive[index]) {
      //   console.log('this.isActive[index] 2 = ', this.isActive[index]);
      //   this.isActive[index] = true;
      // } else {
      //   this.isActive[index] = false;
      // }
    },
    /**
     * Upload new files
     */
    uploadFiles() {
      // if files exists
      if (this.countFiles) {
        this.$store.dispatch('fm/upload', {
          files: this.selectedFiles,
          overwrite: this.overwrite,
          meta: this.metaData,
        }).then((response) => {
        // if upload is successful
          if (response.data.result.status === 'success') {
          // close modal window
            this.hideModal();
          }
        });
      }
    },
    allFilesElem() {
      const selectedFiles = [];
      for (let i = 0; i < this.newFiles.length; i += 1) {
        selectedFiles[i] = this.newFiles[i];
        console.log('new file', selectedFiles[i]);
      }
    },
  },
};
</script>

<style lang="scss">
    .fm-modal-upload {

        .fm-btn-wrapper {
            position: relative;
            overflow: hidden;
            padding-bottom: 6px;
            margin-bottom: 0.6rem;
        }

        .fm-btn-wrapper input[type=file] {
            font-size: 100px;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            cursor: pointer;
        }

        .fm-upload-list .far {
            padding-right: 0.5rem;
        }

        .fm-upload-list .form-check-inline {
            margin-right: 0;
        }

        .fm-upload-info > .progress {
            margin-bottom: 1rem;
        }
    }
    .meta-data-disc{
      margin-top: 3%;
    }
    .isActive{
     height: auto;
    }
    #desc_input{
      outline: none;
    }
    #meta-data{
      margin: 3% 5%;
      outline:none;
    }
    .fa-plus{
      cursor: pointer;
    }
</style>
