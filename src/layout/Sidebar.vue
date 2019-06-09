<template>
  <div class="sidebar" :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Sidebar/Logo.vue";
import SidebarItem from "./Sidebar/SidebarItem.vue";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(["permission_routes", "sidebar"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return false;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>

<style lang="scss">
.sidebar {
  position: absolute;

  .el-scrollbar__view {
    max-width: 180px;
    text-align: left;

    .el-menu--collapse {
      width: 50px;
    }

    .el-tooltip {
      padding: 0 15px !important;
    }

    .el-menu-item.is-active {
      color: white !important;
      font-weight: bold;
    }
  }
}
</style>
