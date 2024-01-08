<template>
  <!-- <v-nav>
    <v-breadcrumbs>
      <v-breadcrumbs-item
        v-for="(crumb, ci) in crumbs"
        :key="ci"
        :disabled="isLast(ci)"
        @click="selected(crumb)"
      >
       <v-container>
        <v-row>
            <router-link :to="crumb.href" class="pd-left-5">{{ crumb.text }}</router-link>
        </v-row>
       </v-container>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
  </v-nav> -->
</template>

<script>
export default {
  props: {
    crumbs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    isLast(index) {
      return index === this.crumbs.length - 1;
    },
    selected(crumb) {
      this.$emit('selected', crumb);
    },
  },
};
</script>
