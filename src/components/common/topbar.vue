<template>
  <div>
    <Menu mode="horizontal" :theme="theme1" active-name="0">
      <MenuItem v-for="(item, index) in nav" :name="index" :key="index">
        {{ item.name }}
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: [{ name: "1" }, { name: "2" }]
    };
  }
};
</script>

<style lang="less">
</style>
