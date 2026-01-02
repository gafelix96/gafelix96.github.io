<template>
  <div class="container">
    <div class="row p-3">
      <div class="col-6">
        Food Variations: {{ items.length }}
      </div>
      <div class="col-6">
        Data file link: <a v-bind:href="fileLocation" target="_blank">{{ fileLocation }}</a>
      </div>
    </div>
    <div class="row">
      <div class="col-11">
        <ag-grid-vue
            style="width: auto; height: 200px"
            class="ag-theme-alpine"
            :columnDefs="columns"
            :rowData="items"
        >
        </ag-grid-vue>
      </div>
    </div>
  </div>
</template>

<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import FEPBar from "./FEPBar.vue";

const filterFeps = (data, filterString) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].n.includes(filterString)) return true;
  }
  return false;
}

export default {
  headerName: "App",
  components: {
    FEPBar,
    AgGridVue,
  },
  data() {
    return {
      itemsSelected: [],
      sortBy: ["t", "f"],
      sortType: ["desc", "asc"],
      columns: [
        {
          headerName: "Name",
          field: "t",
        },
        {
          headerName: "Resource",
          field: "r",
        },
        {
          headerName: "FEP",
          field: "f",
        },
        {
          headerName: "Ingredients",
          field: "i",
        },
        {
          headerName: "Smoke",
          field: "s",
        },
        {
          headerName: "Energy",
          field: "e",
        },
        {
          headerName: "Hunger",
          field: "h",
        },
      ],
      fileLocation: `${window.location.href}data/food-info.json`,
      items: [],
    }
  },
  methods: {
    fetchData() {
      fetch("data/food-info.json", {
        headers: {
          'Cache-Control': 'no-cache'
        }
      }).then((response) => {
        response.json().then((json) => {
          this.items = json;
          console.log(json);
        })
        console.log(response);
      });
    },
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style scoped/>
