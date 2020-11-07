<template>
  <div id="app">
    <TheNavigation />
    <router-view/>
    <portal-target name="modals"></portal-target>
  </div>
</template>

<script>
import TheNavigation from '@/components/TheNavigation.vue'

export default {
  components: {
    TheNavigation 
  }
}

</script>
