<template>
  <div id="dashboard-wrapper" v-if="canShowDashboard">
    <BaseHeader
      :user-name="userName"
      @onChangeSearchText="onChangeSearchText"
    />

    <span class="go-top">
      <base-material
        :size="24"
        class="upload-to-cloud-button"
        name="backup"/>
      <p class="upload-to-cloud-content">File Upload</p>
      <input type="file" id="files" ref="files" v-on:change="handleFilesUpload()"/>
    </span>

    <div class="main-content">
      <ag-grid-vue style="width: 100%; height: 100%;" class="ag-theme-balham" id="myGrid"
        :gridOptions="gridOptions"
        :columnDefs="columnDefs"
        :enableRangeSelection="true"
        :allowContextMenuWithControlKey="true"
        :getContextMenuItems="getContextMenuItems"
        :modules="modules"
        :rowData="mockFileListFilteredBySearchText"
        :getRowHeight="getRowHeight"
      />
    </div>
  </div>
</template>

<script>

  import axios from 'axios'
  import _toLower from 'lodash/toLower'
  import _cloneDeep from 'lodash/cloneDeep'
  import BaseHeader from '@/components/common/base-header/BaseHeader';
  import { AgGridVue } from "@ag-grid-community/vue";
  import { AllModules } from "@ag-grid-enterprise/all-modules";
  import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
  import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
  import dayjs from 'dayjs'
  import { RepositoryFactory } from "./../../repositories/repositoryFactory";
  const LoginRepository = RepositoryFactory.get("login");
  const manageStorage = RepositoryFactory.get("manageStorage");
  const qs = require('qs');
  const FileDownload = require('js-file-download');

  export default {
    name: 'Dashboard',
    components: {
      BaseHeader,
      "ag-grid-vue": AgGridVue
    },
    data() {
      return {
        canShowDashboard: false,
        userName: 'user',
        listFileRawData: null,
        userID: null,
        files: '',
        uploadPercentage: null,
        downloadPercentage: 0,
        gridOptions: null,
        gridApi: null,
        columnApi: null,
        columnDefs: null,
        modules: AllModules,
        rowData: null,
        getRowHeight: null,
        mockFileListFilteredBySearchText: [],
      };
    },
    created() {
      this.userName = localStorage.getItem("userName");
      this.userID = localStorage.getItem("userID")
      let payload = {
        userID: this.userID
      }
      LoginRepository.checkUser(payload)
        .then(res => {
          if (res.data.status) {
            this.canShowDashboard = true;
            axios.get(`https://minio-server-project.appspot.com/api/Buckets/${this.userID}`)
            .then(res => {
              if(!res.data.data) {// bucket name does not exist, then create it
                let payload = JSON.stringify({
                    bucketName: this.userID
                  })
                axios.post(`https://minio-server-project.appspot.com/api/Buckets`,
                  payload,
                  {
                    headers: {
                     'Content-Type': 'application/json'
                    }
                  },
                )
                .then(res => {
                  console.log(res, 'create bucket successfully')//create successfully
                })
                .catch(err => {
                  console.log(err,'Create bucket failed!!');
                });
              }
            })
            .catch(err => {
              console.log(err, 'check bucket failed');
            });
          } else {
            localStorage.removeItem('userID');
            localStorage.removeItem('userName');
            this.$router.push('/SignIn')
          }
        })
        .catch(err => {
          this.$router.push('SignIn')
        });
        this.fetchFileList()
    },
    computed: {

    },
    beforeMount() {
      this.gridOptions = {};
      this.getRowHeight = params => {
        return 40;
      }
      this.columnDefs = [
        {headerName: 'Name', field: 'name', width: 538, sortable: true},
        {headerName: 'Upload time', field: 'uploadTime', width: 238, sortable: true},
        {headerName: 'File size', field: 'size', width: 118, sortable: true},
        {headerName: 'Type', field: 'type', width: 238, sortable: true},
      ]
    },
    watch: {
      uploadPercentage() {
        console.log('uploading: ', this.uploadPercentage)
      },
      downloadPercentage() {
        console.log('downloading: ', this.downloadPercentage)
      }
    },
    mounted() {
      this.gridApi = this.gridOptions.api;
      this.gridColumnApi = this.gridOptions.columnApi;
      this.gridOptions.context = {
          thisComponent : this
      };
    },
    methods: {
      handleFilesUpload() {
        debugger
        console.log(this.userID)
        this.files = this.$refs.files.files;
        let formData = new FormData();
        formData.append('Files', this.files[0]);
        formData.append('bucketName', this.userID)

        axios.post(`https://minio-server-project.appspot.com/api/MinioObjects/PostMultiObject`,// pending API upload
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: function( progressEvent ) {
              this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ));
            }.bind(this)
          }
        ).then(res => {
          let insertFilePayload = {
            userId: this.userID,
            listFile : [{
              name: this.files[0].name,
              type: this.files[0].type,
              size: this.files[0].size,
              uploadTime: dayjs(new Date()).format("DD-MM-YYYY"),
            }]
          }
          manageStorage.insertFile(insertFilePayload)
            .then(res => {
              console.log(res)
              if(res.data.status) {
                this.fetchFileList()
                this.$toasted.success('Upload successfully', 
                  {
                    position: 'top-center',
                    duration: 2000,
                    singleton: true
                  })
                  return;
              }
              this.$toasted.error('Upload successfully', 
                {
                  position: 'top-center',
                  duration: 2000,
                  singleton: true
                })
                return;
            })
            .catch(err => {
              console.log('Binh: failed')
              this.$toasted.error('Upload successfully', 
                {
                  position: 'top-center',
                  duration: 2000,
                  singleton: true
                })
                return;
            })
        })
        .catch(err => {
          console.log(err, 'FAILURE!!');
        });
      },
      onChangeSearchText(searchText) {
        if (searchText) {
          this.mockFileListFilteredBySearchText = this.listFileRawData.filter(x => _toLower(x.name).includes(_toLower(searchText))) // mockFileList --> rawData //pending
          return;
        }
        this.mockFileListFilteredBySearchText = this.listFileRawData
      },
      getContextMenuItems(params) {
        var result = [
          "copy",
          {
            name: `Download`,
            action: function() {
              let self = params.context.thisComponent
              let fileName = self.mockFileListFilteredBySearchText[params.node.rowIndex].name
              let uri = `https://minio-server-project.appspot.com/api/MinioObjects/GetObject?bucketName=${self.userID}&objectName=${fileName}`
              let headerCustom = {
                    'Content-Type': 'application/octet-stream',
                    'Content-Disposition': 'attachment;filename='+fileName,
                  }
              axios.get(uri,// pending API upload
                {
                  responseType: 'blob',
                  headers: headerCustom,
                  onUploadProgress: function( progressEvent ) {
                    this.downloadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ));
                  }.bind(this)
                }
              ).then(function( res){
                console.log('SUCCESS!!', res);
                FileDownload(res.data, fileName);
              })
              .catch(function(){
                console.log('FAILURE!!');
              });
            },
            icon: '<i class="material-icons" style="font-size: 20px; color: #056eff">cloud_download</i>'
          },
          {
            name: "Remove",
            action: function() {
              let self = params.context.thisComponent
              console.log(self.mockFileListFilteredBySearchText[params.node.rowIndex].name)
              window.alert("Delete pending");
            },
            icon: '<i class="material-icons" style="font-size: 24px; color: red">delete_forever</i>',
          },
        ];
        return result;
      },
      fetchFileList() {
        let getFileListPayload = {
          userId: this.userID
        }
        manageStorage.getListFileByUserId(getFileListPayload)
          .then(res => {
            if (res.data.status) {
              this.listFileRawData = res.data.data.listFile
              console.log(this.listFileRawData)
              this.mockFileListFilteredBySearchText = this.listFileRawData.map(f => {
                return {
                  uploadTime: f.uploadTime,
                  name: f.name,
                  type: f.type,
                  size: f.size
                }
              })
              return
            }
            this.listFileRawData = []
          })
          .catch(err => {
            console.log(err, 'server: getListFileByUserId')
          })
      }
    }
  };

  function createFlagImg(flag) {
    return '<img border="0" width="15" height="10" src="https://flags.fmcdn.net/data/flags/mini/' + flag + '.png"/>';
  }

  function createID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
</script>
<style lang="scss">
#dashboard-wrapper {
  height: 100%;
  .go-top {
    transition: width 0.2s;
    position: fixed;
    cursor: pointer;
    bottom: 30px;
    right: 30px;
    width: 46px;
    height: 46px;
    border-radius: 23px;
    background-color: #1155cb;
    z-index: 500;
    input[type=file] {
      cursor: pointer;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
    }
    .upload-to-cloud-button {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
    }
    .upload-to-cloud-content {
      display: none;
    }
    &:hover {
      width: 140px;
      border-radius: 23px;
      .upload-to-cloud-button {
        position: absolute;
        left: 22%;
        top: 46%;
        transform: translate(-50%, -50%);
        color: #fff;
      }
      .upload-to-cloud-content {
        font-family: "NotoSansCJKkr-Regular", "Apple SD Gothic", sans-serif;
        font-size: 14px;
        display: block;
        position: absolute;
        left: 80%;
        top: 50%;
        width: 85%;
        transform: translate(-50%, -50%);
        color: white;
      }
    }
  }
  .main-content {
    height: 100%;
    padding-top: 108px;
    padding-bottom: 32px;
    min-height: 520px;
    overflow: auto;
    min-width: 1024px;
    #myGrid {
      max-width: 1132px;
      height: 100%;
      padding: 22px;
      margin: auto;
      background-color: white;
      padding: 0;
      .ag-root {
        &.ag-layout-normal {
          border:none;
          .ag-row {
            height: 40px!important;
          }
        }
      }
    }
  }
}  
</style>
