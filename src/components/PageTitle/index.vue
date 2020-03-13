<template>
  <h2 class="lims-page-title" :class="{'is-top': isTop}">
    <span>{{ title }}</span>
    <slot></slot>
  </h2>
</template>
<script>
export default {
  name: "PageTitle",
  props: {
    title: {
      type: String,
      required: true
    },
    isTop: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>
<style>
.lims-page-title {
  font-size: 24px;
  font-weight: 400;
  color: #1f2f3d;
  margin-top: 40px;
  margin-bottom: 20px;
}

.lims-page-title.is-top {
  margin-top: 20px;
}
</style>


