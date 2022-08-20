<template>
  <h1>Details</h1>
  <div>
    <h4>Car</h4>
    <hr />
    <dl class="row">
      <dt class="col-sm-2">COMPANY</dt>
      <dd class="col-sm-10">{{ car.Company }}</dd>
      <dt class="col-sm-2">MODEL</dt>
      <dd class="col-sm-10">{{ car.Model }}</dd>
      <dt class="col-sm-2">COLOR</dt>
      <dd class="col-sm-10">{{ car.Color }}</dd>
      <dt class="col-sm-2">PRICE</dt>
      <dd class="col-sm-10">{{ car.Price }}</dd>
    </dl>
  </div>
  <div>
    <router-link :to="'/car/edit/' + car.id">Edit</router-link> |
    <router-link to="/car">Back to List</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      car: {
        id: this.$route.params.id,
        company: "",
        model: "",
        color: "",
        price: "",
      },
    };
  },
  mounted() {
    this.carDetails(this.car);
  },
  methods: {
    async carDetails(car) {
      let res = await fetch("https://localhost:7144/api/car/" + car.id);
      const result = await res.json();
      this.car.company = result.Company;
      this.car.model = result.Model;
      this.car.color = result.Color;
      this.car.price = result.Price;
    },
  },
};
</script>

<style scoped></style>
