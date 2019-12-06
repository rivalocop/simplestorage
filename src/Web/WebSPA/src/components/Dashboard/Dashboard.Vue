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
      <input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>
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


  const MOCK_DATA = [
          {
            uploadTime: 'Sun Dec 01 2019 03:21:12 GMT+0700 (Indochina Time)',
            name: 'Co ban ve dien toan dam may.txt',
            type: 'text/plain',
            size: '993'
          },
          {
            uploadTime: 'Sun Dec 01 2019 03:21:12 GMT+0700 (Indochina Time)',
            name: 'background.png',
            type: 'image/png',
            size: '5700111'
          },
          {
            uploadTime: 'Sun Dec 01 2019 03:21:12 GMT+0700 (Indochina Time)',
            name: 'slide thuyet trinh',
            type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            size: '4333000'
          }
        ]

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
        files: '',
        uploadPercentage: null,
        gridOptions: null,
        gridApi: null,
        columnApi: null,
        columnDefs: null,
        modules: AllModules,
        rowData: null,
        getRowHeight: null,
        mockFileListFilteredBySearchText: MOCK_DATA,
      };
    },
    created() {
      this.userName = localStorage.getItem("userName");
      let payload = {
        userID: localStorage.getItem("userID")
      }
      LoginRepository.checkUser(payload)
        .then(res => {
          console.log(res)
          if (res.data.status) {
            this.canShowDashboard = true
          } else {
            localStorage.removeItem('userID');
            localStorage.removeItem('userName');
            this.$router.push('/SignIn')
          }
        })
        .catch(err => {
          this.$router.push('SignIn')
        });
      this.mockFileListFilteredBySearchText = MOCK_DATA.map(f => {
        return {
          uploadTime: dayjs(f.uploadTime).format("DD-MM-YYYY"),
          name: f.name,
          type: f.type,
          size: f.size
        }
      })
    },
    computed: {
      // mockFileListFilteredBySearchText() {
      //   let result = rawData.map(f => {
      //     return {
      //       uploadTime: dayjs(f.uploadTime).format("DD-MM-YYYY"),
      //       name: f.name,
      //       type: f.type,
      //       size: f.size
      //     }
      //   })
      //   return result
      // }
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
    mounted() {
      this.gridApi = this.gridOptions.api;
      this.gridColumnApi = this.gridOptions.columnApi;
    },
    methods: {
      handleFilesUpload() {
        debugger
        this.files = this.$refs.files.files;
        let formData = new FormData();
        for( let i = 0; i < this.files.length; i++ ) {
          let file = this.files[i];
          formData.append('files[' + i + ']', file, file.name);
        }

        axios.post( '/multiple-files',// pending API upload
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: function( progressEvent ) {
              this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ));
            }.bind(this)
          }
        ).then(function(){
          console.log('SUCCESS!!');
        })
        .catch(function(){
          console.log('FAILURE!!');
        });
      },
      onChangeSearchText(searchText) {
        if (searchText) {
          this.mockFileListFilteredBySearchText = MOCK_DATA.filter(x => _toLower(x.name).includes(_toLower(searchText))) // mockFileList --> rawData //pending
          return;
        }
        this.mockFileListFilteredBySearchText = MOCK_DATA
      },
      getContextMenuItems(params) {
        var result = [
          "copy",
          {
            name: `Download`,
            action: function() {
              window.alert("Download pending");
            },
            icon: '<i class="material-icons" style="font-size: 20px; color: #056eff">cloud_download</i>'
          },
          {
            name: "Remove",
            action: function() {
              window.alert("Delete pending");
            },
            icon: '<i class="material-icons" style="font-size: 24px; color: red">delete_forever</i>',
          },
        ];
        return result;
      },
    }
  };

  function createFlagImg(flag) {
    return '<img border="0" width="15" height="10" src="https://flags.fmcdn.net/data/flags/mini/' + flag + '.png"/>';
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
