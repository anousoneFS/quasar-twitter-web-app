<template>
  <q-layout view="lHr lpR fFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title class="text-weight-bold">
          <q-icon class="header-icon lt-md" color="primary" name="fas fa-dove" size="md" />
          <span class="gt-sm"> {{ $route.name }}</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer :width="283" show-if-above side="left" bordered v-model="left">
      <q-icon class="q-pa-md" color="primary" name="fas fa-dove" size="lg" />

      <q-list>
        <q-item to="/" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon name="home" size="md" />
          </q-item-section>
          <q-item-section class="text-h6 text-weight-bold">Home</q-item-section>
        </q-item>

        <q-item to="/about" clickable v-ripple exact>
          <q-item-section avatar>
            <q-icon name="help" size="md" />
          </q-item-section>
          <q-item-section class="text-h6 text-weight-bold"
            >About</q-item-section
          >
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer v-model="right" show-if-above side="right" bordered>
      <q-input
        class="q-ma-md"
        dense
        rounded
        outlined
        color="primary"
        placeholder="Search Twitter"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-list separator padding>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label overline class="text-grey">Education</q-item-label>
            <q-item-label class="text-weight-bold"
              >Something amazing Happened!</q-item-label
            >
            <q-item-label caption>
              <span class="text-weight-bold">Janet</span>
              -- I'll be in your neighborhood doing errands this weekend. Do you
              want to grab brunch?
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label overline class="text-grey">Education</q-item-label>
            <q-item-label class="text-weight-bold"
              >Something amazing Happened!</q-item-label
            >
            <q-item-label caption>
              <span class="text-weight-bold">Janet</span>
              -- I'll be in your neighborhood doing errands this weekend. Do you
              want to grab brunch?
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <keep-alive>
      <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: false,
      right: false
    }
  }
}
</script>
<style lang="sass">
.header-icon
  position: absolute
  bottom: 0
  left: 50%
  margin-bottom: 10px
  transform: transformX(-50%)
</style>
