<template>
  <h1>Edit</h1>

  <h4>Car</h4>
  <hr />
  <div class="row">
    <div class="col-md-4">
      <form @click.prevent>
        <input type="hidden" asp-for="Id" />
        <div class="form-group">
          <label class="control-label">COMPANY</label>
          <input v-model="car.company" class="form-control" />
        </div>
        <div class="form-group">
          <label class="control-label">MODEL</label>
          <input v-model="car.model" class="form-control" />
        </div>
        <div class="form-group">
          <label class="control-label">COLOR</label>
          <input v-model="car.color" class="form-control" />
        </div>
        <div class="form-group">
          <label class="control-label">PRICE</label>
          <input v-model="car.price" class="form-control" />
        </div>
        <div class="form-group">
          <input
            type="submit"
            value="Edit"
            @click="editCar"
            class="btn btn-primary"
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
    editCar() {
      //put request for edit car

      this.$router.push("/car");
    },
  },
};
</script>

<style scoped></style>
