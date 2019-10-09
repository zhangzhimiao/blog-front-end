<template>
  <div class="content-wrap">
    <div class="nav-wrap">
      <Menu theme="light" :active-name="0">
        <MenuGroup title="类别">
          <MenuItem
            v-for="(column, index) in columns"
            :key="index"
            :name="index"
          >
            <Icon type="md-document" />
            {{ column.name }}
          </MenuItem>
        </MenuGroup>
      </Menu>
    </div>
    <div class="list-wrap">
      <List border>
        <ListItem>This is a piece of text.</ListItem>
        <ListItem>This is a piece of text.</ListItem>
        <ListItem>This is a piece of text.</ListItem>
      </List>
    </div>
  </div>
</template>

<script>
import { service } from "../../utils/service";
export default {
  props: ["title", "content", "author"],
  data() {
    return {
      columns: []
    };
  },
  computed: {},
  mounted() {
    var _this = this;
    const userId = sessionStorage.getItem("userId");
    service.getUserColumns(userId).then(d => {
      _this.columns = d.data.data[0].columns;
    });
  }
};
</script>

<style lang="less" scoped>
.content-wrap {
  width: 100%;
  max-width: 1400px;
  display: flex;
  padding: 50px 50px;
  justify-content: space-between;
  .nav-wrap {
    width: 20%;
  }
  .list-wrap {
    width: 70%;
  }
}
</style>
