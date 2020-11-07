<template>
  <div id="app" class="container">
    <TheNavigation />
    <router-view :style="{marginTop: '20px'}"/>
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
