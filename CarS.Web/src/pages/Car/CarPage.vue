<template>
  <div class="row">
    <div class="col-md-3">
      <filter-form :SearchOptions="SearchOptions" v-on:filter="search" />
    </div>
    <div class="col-md-9">
      <div :class="!isLoading ? 'd-block' : 'd-none'">
        <cars-list :cars="cars" @order="orderBy" />
        <pagination-com :Pagination="Pagination" @paging="paging" />
      </div>
      <div
        v-show="isLoading"
        class="justify-content-center text-center align-items-center"
      >
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FilterForm from "@/components/FilterForm.vue";
import CarsList from "@/components/CarsList.vue";
import PaginationCom from "@/components/PaginationCom.vue";

export default {
  components: {
    FilterForm,
    CarsList,
    PaginationCom,
  },
  data() {
    return {
      cars: [],
      SearchTerms: {
        MinPrice: 0,
        MaxPrice: 0,
        Company: [],
        Model: [],
        Color: [],
        OrderBy: ",",
      },
      Pagination: {
        PageNumber: 1,
        PageSize: 10,
        TotalCount: 40,
        PageCount: 4,
      },
      SearchOptions: {
        Companies: [],
        Models: [],
        Colors: [],
      },
      isLoading: false,
    };
  },
  mounted() {
    this.searchByCondition(1, 10);
  },
  methods: {
    async paging(num, pagesize) {
      this.Pagination.PageNumber = num;
      await this.searchByCondition(num, this.Pagination.PageSize);
    },
    orderBy(OrderBy) {
      this.SearchTerms.OrderBy = OrderBy;
      this.searchByCondition(1, 10);
    },
    async search(S) {
      this.SearchTerms.MinPrice = S.MinPrice;
      this.SearchTerms.MaxPrice = S.MaxPrice;
      this.SearchTerms.Company = S.Company;
      this.SearchTerms.Model = S.Model;
      this.SearchTerms.Color = S.Color;
      this.SearchTerms.Price = S.Price;
      this.Pagination.PageNumber = 1;
      await this.searchByCondition(1, 10);
    },
    async searchByCondition(pageNumber, pageSize) {
      try {
        this.Pagination.PageNumber = pageNumber;
        this.isLoading = true;
        let url =
          "https://localhost:7144/api/car" +
          "?MinPrice=" +
          this.SearchTerms.MinPrice +
          "&MaxPrice=" +
          this.SearchTerms.MaxPrice +
          "&Company=" +
          this.SearchTerms.Company.toString() +
          "&Model=" +
          this.SearchTerms.Model.toString() +
          "&Color=" +
          this.SearchTerms.Color.toString() +
          "&OrderBy=" +
          this.SearchTerms.OrderBy +
          "&PageNumber=" +
          this.Pagination.PageNumber +
          "&PageSize=" +
          this.Pagination.PageSize;
        let res = await fetch(url, {
          method: "GET",
        });
        this.Pagination = JSON.parse(res.headers.get("x-pagination"));
        console.log(this.Pagination);
        const result = await res.json();
        this.cars = result.cars;
        this.SearchOptions.Companies = result.company.split(",");
        this.SearchOptions.Models = result.model.split(",");
        this.SearchOptions.Colors = result.color.split(",");
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style></style>
