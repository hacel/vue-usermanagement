<script>
export default {
  name: "ctable",
  template: "#ctable",
  props: {
    columns: Array,
    body: Array,
  },
};
</script>

<template>
  <table>
    <thead>
      <slot name="thead">
        <tr>
          <th
            v-for="key in columns"
            :key="key.id"
            @click="sortBy(key)"
            :class="{ active: sortKey == key }"
          >
            {{ key | capitalize }}
          </th>
        </tr>
      </slot>
    </thead>
    <tbody>
      <slot name="tbody">
        <tr v-for="entry in body" :key="entry.id">
          <td v-for="key in columns" :key="key.id">
            {{ entry[key] }}
          </td>
        </tr>
      </slot>
    </tbody>
  </table>
</template>