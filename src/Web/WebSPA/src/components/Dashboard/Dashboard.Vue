<template>
  <div id="dashboard-wrapper">
    <div class="container">
      <div class="large-12 medium-12 small-12 cell">
        <label>Files
          <input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>
        </label>
        <button v-on:click="submitFiles()">Submit</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      files: ''
    };
  },
  methods: {
    handleFilesUpload(){
      this.files = this.$refs.files.files;
    },
    submitFiles(){
        let formData = new FormData();
        for( var i = 0; i < this.files.length; i++ ) {
          let file = this.files[i];
          formData.append('files[' + i + ']', file);
        }
        axios.post( '/multiple-files',// pending
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function(){
          console.log('SUCCESS!!');
        })
        .catch(function(){
          console.log('FAILURE!!');
        });
      }
  }
};
</script>
<style lang="scss">
  
</style>


