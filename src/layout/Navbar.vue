<template>
  <div class="navbar">
    <hamburger
      v-if="!$route.fullPath.includes('/event')"
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <i
      v-if="$route.fullPath.includes('/event')"
      id="hamburger-container"
      class="el-icon-back hamburger-container"
      style="font-size: 20px; padding: 0 10px;"
      @click="$router.push('/dashboard/all-events')"
    />

    <div class="right-menu">
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img
            v-if="avatar"
            :src="avatar + '?imageView2/1/w/80/h/80'"
            class="user-avatar"
          />
          <svg-icon
            v-if="!avatar"
            icon-class="male-avatar"
            class-name="male-avatar"
          ></svg-icon>
          <span style="margin: 0 10px;">{{ username }}</span>
          <i class="el-icon-caret-bottom" />
        </div>

        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>
              Profile
            </el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>
              Dashboard
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">Logout</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device"]),
    username() {
      return JSON.parse(window.localStorage.getItem("auth")).user.name;
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.commit("toggleSidebar");
    },
    async logout() {
      this.$router.push("/");
      window.localStorage.removeItem("apollo-token");
      window.localStorage.removeItem("auth");
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .male-avatar {
          font-size: 30px;
          background: rgba(48, 65, 86, 0.5);
          width: 40px;
          height: 40px;
          padding: 5px;
          border-radius: 20px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
