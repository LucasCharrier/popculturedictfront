<template>
  <div id="app">
    <TheNavigation />
    <div class="container">
      <router-view :style="{marginTop: '20px'}"/>
    </div>
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
<style>
    body {
        font-family: 'Quicksand', sans-serif;
        background-color:ghostwhite
 
    }

/* font-family: 'Bree Serif', serif;
font-family: 'Copse', serif;
font-family: 'Montserrat', sans-serif;
font-family: 'Open Sans', sans-serif;
font-family: 'Quicksand', sans-serif; */
</style>
