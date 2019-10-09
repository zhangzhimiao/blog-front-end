<template>
  <div class="content-wrap">
    <div class="nav-wrap">
      <Menu theme="light" active-name="1">
        <MenuGroup title="类别">
          <MenuItem name="1">
            <Icon type="md-document" />
            文章管理
          </MenuItem>
          <MenuItem name="2">
            <Icon type="md-chatbubbles" />
            评论管理
          </MenuItem>
        </MenuGroup>
        <MenuItem name="3">
          <Icon type="md-heart" />
          用户留存
        </MenuItem>
        <MenuItem name="4">
          <Icon type="md-leaf" />
          流失用户
        </MenuItem>
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
      _this.columns = d.data[0].columns;
    });
  }
};
</script>

<style lang="less" scoped>
.content-wrap {
  width: 100%;
  max-width: 1400px;
  display: flex;
  padding: 50px 0;
  .nav-wrap {
    width: 20%;
  }
  .list-wrap {
    width: 70%;
  }
}
</style>
