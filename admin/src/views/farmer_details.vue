<template>
  <div id="farmer-details">
    {{ farmerId }}
  </div>
</template>

<script>
export default({
  name: "farmer-details",

  data() {
    return {
      farmerId:  this.$route.params.farmerId
    }
  }
})
</script>