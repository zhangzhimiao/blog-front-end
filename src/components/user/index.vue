<template>
  <div class="content-wrap">
    <div class="nav-wrap">
      <Menu theme="light" active-name="文章列表">
        <MenuGroup title="菜单">
          <MenuItem name="文章列表">
            <Icon type="md-document" />
            文章列表
          </MenuItem>
          <MenuItem name="个人中心">
            <Icon type="md-chatbubbles" />
            个人中心
          </MenuItem>
          <MenuItem name="个人中心">
            <Icon type="md-chatbubbles" />
            个人中心
          </MenuItem>
        </MenuGroup>
      </Menu>
    </div>
    <div class="list-wrap"></div>
  </div>
</template>

<script>
export default {};
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
