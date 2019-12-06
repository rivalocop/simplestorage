<template>
  <b-row
    id="header"
    align-h="between"
    align-v="center"
    no-gutters
  >
    <b-row
      align-v="center"
      no-gutters
    >
      <b-row class="left-side" align-v="center" no-gutters>
        <div class="cloud-icon"/>
        Bản Mây
      </b-row>
      <div class="search-form">
        <input
          v-model="inputSearch"
          placeholder="Search file"
        />
        <base-material
          :size="24"
          color="gray-1"
          name="search"
        />
      </div>
    </b-row>
    <b-row
      no-gutters
      class="align-items-center header-icon-right">
      <b-row
        class="header-right-back-link"
        align-v="center"
        no-gutters
      >
        <base-material
          class="face-icon"
          name="face"/>
        <b-dropdown
          size="sm"
          variant="transparent"
          toggle-class="text-decoration-none only-button"
          no-caret
        >
          <template slot="button-content">
            <span class="font-family-notosanscjkkr-medium font-12 user-name">
              {{ userName }}
            </span>
          </template>
          <b-dropdown-item-button @click="logout">
            Change password
          </b-dropdown-item-button>
          <b-dropdown-item-button @click="logout">
            Log out
          </b-dropdown-item-button>
        </b-dropdown>
      </b-row>
    </b-row>
  </b-row>
</template>
<script>
  
  //import {toStringWithMatchesHighlighted} from '@/util/stringUtils';

  export default {
    name: 'BaseHeader',
      props: {
      userName: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        inputSearch: ''
      }
    },
    watch: {
      inputSearch() {
        this.$emit('onChangeSearchText', this.inputSearch)
      }
    },
    methods:{
      logout() {
        localStorage.removeItem('userID');
        localStorage.removeItem('userName');
        this.$router.push('/SignIn')
      }
    },
  };
</script>

<style lang="scss">
  #header {
    height: 64px;
    width: 100%;
    padding: 0 16px;
    position: absolute;
    top: 0px;
    background-color: white;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
    .left-side {
      color: #5f6368;
      width: 256px;
      .cloud-icon {
        background-image: url("./../../../assets/cloud-icon.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 56px;
        width: 56px;
        margin-right: 8px;
      }
    }
    .search-form {
      border-radius: 8px;
      background-color: #f2f3f4;
      padding-right: 8px;
      input {
        border-radius: 8px;
        background-color: #f2f3f4;
        border: none;
        height: 46px;
        min-width: 500px;
        padding: 0 8px 0 16px;
        &:focus {
         outline: none
        }
      }
      .material-icons {
        vertical-align: middle
      }
    }
  }
</style>
