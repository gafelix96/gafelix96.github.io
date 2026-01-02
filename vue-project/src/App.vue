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
            class="ag-theme-alpine"
            :columnDefs="columns"
            :rowData="items"
            :defaultColDef="defaultColDef"
            :rowGroupPanelShow="rowGroupPanelShow"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VGrid from "@revolist/vue3-datagrid";
import {AgGridVue} from "ag-grid-vue3";
import 'ag-grid-enterprise';
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import FEPBar from "./FEPBar.vue";

const filterFeps = (data, filterString) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].n.includes(filterString)) return true;
  }
  return false;
}

function formatFep(params) {
  console.log(params)
  return params;
}

function image(params) {
  return '<img src="http://www.havenandhearth.com/mt/r/' + params + '"> <span>' + params + '</span>'
}

export default {
  name: "App",
  components: {
    FEPBar,
    AgGridVue,
  },
  data() {
    return {
      defaultColDef: {
        flex: 1,
        floatingFilter: true,
        sortable: true,
        resizable: true,
        filter: true,
        rowGroupPanelShow: 'always'
      },
      columns: [
        {
          headerName: "Name",
          field: "t",
          cellDataType: 'text',
          suppressStickyLabel: true,
        },
        {
          headerName: "Resource",
          field: "r",
          cellDataType: 'object',
        },
        {
          headerName: "FEP",
          field: "f",
          children: [
            {headerName: 'Strength', field: 'str', columnGroupShow: 'open'},
            {headerName: 'Agility', field: 'agi', columnGroupShow: 'open'},
            {headerName: 'Intelligence', field: 'int', columnGroupShow: 'open'},
            {headerName: 'Constitution', field: 'con', columnGroupShow: 'open'},
            {headerName: 'Perception', field: 'per', columnGroupShow: 'open'},
            {headerName: 'Charisma', field: 'cha', columnGroupShow: 'open'},
            {headerName: 'Dexterity', field: 'dex', columnGroupShow: 'open'},
            {headerName: 'Will', field: 'wil', columnGroupShow: 'open'},
            {headerName: 'Psyche', field: 'psy', columnGroupShow: 'open'},
            {headerName: "Total", field: 'fep', columnGroupShow: 'closed', aggFunc: 'sum'}
          ],
          valueFormatter: formatFep
        },
        {
          headerName: "Ingredients",
          field: "i",
          rowGroup: true,
          hide: true,
          suppressSizeToFit: true,
        },
        {
          headerName: "Smoke",
          rowGroup: true,
          hide: true,
          field: "s",
        },
        {
          headerName: "Energy",
          field: "e",
          cellDataType: 'number'
        },
        {
          headerName: "Hunger",
          field: "h",
          cellDataType: 'number'
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

<style>
.ag-root-wrapper-body {
  height: auto !important;
}
</style>
