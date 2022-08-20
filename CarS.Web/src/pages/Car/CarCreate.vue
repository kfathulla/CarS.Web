<template>
  <h1>Create</h1>

  <h4>Car</h4>
  <hr />
  <div class="row">
    <div class="col-md-4">
      <form @click.prevent>
        <div class="form-group">
          <label class="control-label">Company</label>
          <input v-model="car.company" class="form-control" />
        </div>
        <div class="form-group">
          <label class="control-label">Model</label>
          <input v-model="car.model" class="form-control" />
        </div>
        <div class="form-group">
          <label class="control-label">Color</label>
          <input v-model="car.color" class="form-control" />
        </div>
        <div class="form-group">
          <label class="control-label">Price</label>
          <input v-model="car.price" class="form-control" />
        </div>
        <div class="form-group">
          <input
            type="submit"
            value="Create"
            class="btn btn-primary"
            @click="createCar"
          />
        </div>
      </form>
    </div>
  </div>

  <div>
    <router-link to="/car">Back to List</router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      car: {
        company: "",
        model: "",
        color: "",
        price: "",
      },
    };
  },
  methods: {
    createCar() {
      //create car with post request

      this.$router.push("/car");
    },
  },
};
</script>
