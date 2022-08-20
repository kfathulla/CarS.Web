<template>
  <h1>Delete</h1>

  <h3>Are you sure you want to delete this?</h3>
  <div>
    <h4>Car</h4>
    <hr />
    <dl class="row">
      <dt class="col-sm-2">COMPANY</dt>
      <dd class="col-sm-10">{{ car.company }}</dd>
      <dt class="col-sm-2">MODEL</dt>
      <dd class="col-sm-10">{{ car.model }}</dd>
      <dt class="col-sm-2">COLOR</dt>
      <dd class="col-sm-10">{{ car.color }}</dd>
      <dt class="col-sm-2">PRICE</dt>
      <dd class="col-sm-10">{{ car.price }}</dd>
    </dl>

    <form>
      <input
        type="submit"
        value="Delete"
        class="btn btn-danger"
        v-on:click="deleteCar"
      />
      |
      <router-link to="/car">Back to List</router-link>
    </form>
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
  methods: {
    deleteCar() {
      //delete with delete method

      this.$router.push("/car");
    },
  },
};
</script>

<style scoped></style>
