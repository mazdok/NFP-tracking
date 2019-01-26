<template>
  <div>
    <el-menu
      v-show="isUserAuthenticated"
      class="sidebar-menu" 
      :class="{'open': isSidebarOpen}"
      default-active="/"
      router>
      <div class="sidebar-user">
        <div class="sidebar-user__info">
          <p class="sidebar-user__name">{{ getUser.name }}</p>
          <p class="sidebar-user__email">{{ getUser.email }}</p>
        </div>
      </div>
      <slot v-for="link in menuLinks">
        <el-menu-item
          :index="link.path"
          @click="itemClicked"
          >
          <i class="sidebar-icons" :class="link.icon"></i>
          <span>{{ link.name }}</span>
        </el-menu-item>
      </slot>
      <el-submenu index="/info">
        <template slot="title">
          <i class="el-icon-question sidebar-icons"></i>
          <span>Explanation</span>
        </template>
        <slot 
          v-for="link in infoLinks">
          <el-menu-item
            :index="link.path"
            @click="scrollToHash">
            {{ link.name }}
          </el-menu-item>  
        </slot>
      </el-submenu>
      <div @click="signOut">
        <el-menu-item index="4">
          <font-awesome-icon icon="sign-out-alt" class="sidebar-icons"></font-awesome-icon>
          <span>Sign out</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'sidebar',
  data() {
    return {
      menuLinks: [
        {
          name: 'Add day',
          path: '/',
          icon: 'el-icon-circle-plus'
        },
        {
          name: 'Observation map',
          path: '/cycles',
          icon: 'el-icon-menu'
        }
      ],
      infoLinks: [
        {
          name: 'Color',
          path: '/info#color'
        },
        {
          name: 'Sensation',
          path: '/info#sensation'
        },
        {
          name: 'Type of mucus',
          path: '/info#mucus'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      isSidebarOpen: state => state.generalModule.isSidebarOpen,
      getUser: state => state.userModule.user
    }),
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated
    }
  },
  methods: {
    signOut() {
      this.$store.commit('TOGGLE_SIDEBAR', false)
      this.$store.dispatch('signOut')
    },
    itemClicked() {
      this.$store.commit('TOGGLE_SIDEBAR', false)
    },
    scrollToHash() {
      var hash = this.$route.hash
			this.$nextTick(() => {
        this.$scrollTo(hash, 0, {
          offset: -61
				})
			})
      this.$store.commit('TOGGLE_SIDEBAR', false)
		}
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/variables.scss';

  .sidebar-menu {
    position: fixed;
    width: 65vw;
    height: 100%;
    z-index: 2;
    background: #fff;
    // border-right: solid 1px #e6e6e6;
    transform: translateX(-101%);
    transition: all .3s ease-in-out;
    &.open {
      transform: translateX(0%);
    }
  }

  .sidebar-user {
    background: $teal-gradient;

    &__info {
      padding: 10px 20px;
      color: #fff;
    }

    &__name {
      margin: .5rem 0;
    }

    &__email {
      margin: .5rem 0;
      font-size: .75rem;
      color: $light-teal;
    }
  }

  .sidebar-icons {
    margin-right: 10px;
    font-size: 1.25rem;
    color: $regular-text;
    text-align: left !important;
  }
</style>
