<template>
  <div>
    <div class="float-start">
      <h2>Avtomobillar ro'yhati</h2>
    </div>
    <div class="float-end">
      <router-link to="/car/create" class="btn btn-primary"
        >Add Car</router-link
      >
    </div>
    <br />
    <div v-if="cars.length > 0">
      <table class="table">
        <thead>
          <tr>
            <th>
              <div>
                Company
                <img
                  :class="Colors.Company == 'asc' ? 'bg-primary' : 'bg-light'"
                  @click="sort('Company asc')"
                  src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/16/000000/external-sort-arrows-pack-tanah-basah-basic-outline-tanah-basah.png"
                />
                <img
                  :class="Colors.Company == 'desc' ? 'bg-primary' : 'bg-light'"
                  class="ms-1"
                  @click="sort('Company desc')"
                  src="https://img.icons8.com/ios-filled/16/000000/generic-sorting.png"
                />
              </div>
            </th>
            <th>
              <div>
                Model
                <img
                  :class="Colors.Model == 'asc' ? 'bg-primary' : 'bg-light'"
                  @click="sort('Model asc')"
                  src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/16/000000/external-sort-arrows-pack-tanah-basah-basic-outline-tanah-basah.png"
                />
                <img
                  :class="Colors.Model == 'desc' ? 'bg-primary' : 'bg-light'"
                  class="ms-1"
                  @click="sort('Model desc')"
                  src="https://img.icons8.com/ios-filled/16/000000/generic-sorting.png"
                />
              </div>
            </th>
            <th>
              <div>
                Color<img
                  :class="Colors.Color == 'asc' ? 'bg-primary' : 'bg-light'"
                  @click="sort('Color asc')"
                  src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/16/000000/external-sort-arrows-pack-tanah-basah-basic-outline-tanah-basah.png"
                />
                <img
                  :class="Colors.Color == 'desc' ? 'bg-primary' : 'bg-light'"
                  class="ms-1"
                  @click="sort('Color desc')"
                  src="https://img.icons8.com/ios-filled/16/000000/generic-sorting.png"
                />
              </div>
            </th>
            <th>
              <div>
                Price<img
                  :class="Colors.Price == 'asc' ? 'bg-primary' : 'bg-light'"
                  @click="sort('Price asc')"
                  src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/16/000000/external-sort-arrows-pack-tanah-basah-basic-outline-tanah-basah.png"
                />
                <img
                  :class="Colors.Price == 'desc' ? 'bg-primary' : 'bg-light'"
                  class="ms-1"
                  @click="sort('Price desc')"
                  src="https://img.icons8.com/ios-filled/16/000000/generic-sorting.png"
                />
              </div>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody tag="tbody" name="car-table" is="vue:transition-group">
          <tr v-for="car in cars" :key="car.id" tag="tr">
            <td>{{ car.company }}</td>
            <td>{{ car.model }}</td>
            <td>{{ car.color }}</td>
            <td>{{ car.price }}</td>
            <td>
              <div class="float-end">
                <router-link
                  :to="'car/edit/' + car.id"
                  class="btn btn-primary"
                  style="width: 75px"
                  >Edit</router-link
                >
                <button
                  @click="$router.push(`/car/details/${car.id}`)"
                  class="btn btn-info mx-lg-1 mx-md-1 mx-xxl-1 mx-xl-1"
                  style="width: 75px"
                >
                  Details
                </button>
                <router-link
                  :to="'car/delete/' + car.id"
                  class="btn btn-danger"
                  style="width: 75px"
                  >Delete</router-link
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="float-none align-items-start">
      <br />
      <h4 class="text-muted mt-1">So'rovingiz bo'yicha natijalar topilmadi</h4>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cars: Array,
  },
  data() {
    return {
      Colors: {
        Company: "",
        Model: "",
        Color: "",
        Price: "",
      },
      OrderBy: ",",
    };
  },
  methods: {
    sort(str) {
      let orderStr = this.OrderBy;
      let s = str.split(" ");
      if (s[0] == "Company") {
        if (orderStr.includes("Company")) {
          if (s[1] == this.Colors.Company) {
            this.Colors.Company = "";
            if (s[1] == "asc") orderStr = orderStr.replace("Company,", "");
            else orderStr = orderStr.replace("Company desc,", "");
          } else if (s[1] == "asc") {
            this.Colors.Company = "asc";
            orderStr = orderStr.replace("Company desc", "Company");
          } else if (s[1] == "desc") {
            this.Colors.Company = "desc";
            orderStr = orderStr.replace("Company", "Company desc");
          }
        } else {
          this.Colors.Company = s[1];
          orderStr =
            orderStr + "Company" + (s[1] == "asc" ? "" : " desc") + ",";
        }
      } else if (s[0] == "Model") {
        if (orderStr.includes("Model")) {
          if (s[1] == this.Colors.Model) {
            this.Colors.Model = "";
            if (s[1] == "asc") orderStr = orderStr.replace("Model,", "");
            else orderStr = orderStr.replace("Model desc,", "");
          } else if (s[1] == "asc") {
            this.Colors.Model = "asc";
            orderStr = orderStr.replace("Model desc", "Model");
          } else if (s[1] == "desc") {
            this.Colors.Model = "desc";
            orderStr = orderStr.replace("Model", "Model desc");
          }
        } else {
          this.Colors.Model = s[1];
          orderStr = orderStr + "Model" + (s[1] == "asc" ? "" : " desc") + ",";
        }
      } else if (s[0] == "Color") {
        if (orderStr.includes("Color")) {
          if (s[1] == this.Colors.Color) {
            this.Colors.Color = "";
            if (s[1] == "asc") orderStr = orderStr.replace("Color,", "");
            else orderStr = orderStr.replace("Color desc,", "");
          } else if (s[1] == "asc") {
            this.Colors.Color = "asc";
            orderStr = orderStr.replace("Color desc", "Color");
          } else if (s[1] == "desc") {
            this.Colors.Color = "desc";
            orderStr = orderStr.replace("Color", "Color desc");
          }
        } else {
          this.Colors.Color = s[1];
          orderStr = orderStr + "Color" + (s[1] == "asc" ? "" : " desc") + ",";
        }
      } else if (s[0] == "Price") {
        if (orderStr.includes("Price")) {
          if (s[1] == this.Colors.Price) {
            this.Colors.Price = "";
            if (s[1] == "asc") orderStr = orderStr.replace("Price,", "");
            else orderStr = orderStr.replace("Price desc,", "");
          } else if (s[1] == "asc") {
            this.Colors.Price = "asc";
            orderStr = orderStr.replace("Price desc", "Price");
          } else if (s[1] == "desc") {
            this.Colors.Price = "desc";
            orderStr = orderStr.replace("Price", "Price desc");
          }
        } else {
          this.Colors.Price = s[1];
          orderStr = orderStr + "Price" + (s[1] == "asc" ? "" : " desc") + ",";
        }
      }
      this.OrderBy = orderStr;
      this.$emit("order", orderStr);
    },
  },
};
</script>
<style scoped>
.car-table-enter-active,
.car-table-leave-active {
  transition: all 0.4s ease;
}

.car-table-enter-from,
.car-table-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
.car-table-move {
  transition: all 1s;
}
</style>
