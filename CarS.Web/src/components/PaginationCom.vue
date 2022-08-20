<template>
  <nav aria-label="Page navigation example">
    <ul v-show="count > size" class="pagination justify-content-center">
      <li :class="number == 1 ? 'disabled' : ''" class="page-item">
        <button class="page-link" @click="func(number - 1)">Orqaga</button>
      </li>
      <template
        v-for="n in number < size - dotIn ? size - dotIn - 1 : dotIn"
        :key="n"
      >
        <li class="page-item" :class="number == n ? 'active' : ''">
          <button class="page-link" @click="func(n)">{{ n }}</button>
        </li>
      </template>
      <li class="page-item disabled" v-show="number >= size - dotIn">
        <button class="page-link">...</button>
      </li>
      <template v-for="n in size - 2 * dotIn - 2">
        <li
          v-show="number >= size - dotIn && number + dotIn + 1 < count"
          :class="
            number == n + number + dotIn + 1 - parseInt(size / 2, 10) ||
            size - 2 * dotIn - 2 == 1
              ? 'active'
              : ''
          "
          class="page-item"
        >
          <button
            class="page-link"
            @click="
              func(
                size - 2 * dotIn - 2 == 1
                  ? number
                  : n + number + dotIn + 1 - parseInt(size / 2, 10)
              )
            "
          >
            {{
              size - 2 * dotIn - 2 == 1
                ? number
                : n + number + dotIn + 1 - parseInt(size / 2, 10)
            }}
          </button>
        </li>
      </template>
      <li class="page-item disabled" v-show="number + dotIn + 1 < count">
        <button class="page-link">...</button>
      </li>
      <template
        v-for="n in number + dotIn + 1 >= count ? size - dotIn - 1 : dotIn"
        :key="n"
      >
        <li
          :class="
            number ==
            count + n - (number + dotIn + 1 >= count ? size - dotIn - 1 : dotIn)
              ? 'active'
              : ''
          "
          class="page-item"
        >
          <button
            class="page-link"
            @click="
              func(
                count +
                  n -
                  (number + dotIn + 1 >= count ? size - dotIn - 1 : dotIn)
              )
            "
          >
            {{
              count +
              n -
              (number + dotIn + 1 >= count ? size - dotIn - 1 : dotIn)
            }}
          </button>
        </li>
      </template>
      <li :class="number == count ? 'disabled' : ''" class="page-item">
        <button class="page-link" @click="func(number + 1)">Keyingi</button>
      </li>
    </ul>
    <ul v-show="count <= size">
      <li :class="number == 1 ? 'disabled' : ''" class="page-item">
        <button class="page-link" @click="func(number - 1)">Oldingi</button>
      </li>
      <template v-for="n in count">
        <li :class="number == n ? 'active' : ''" class="page-item">
          <button class="page-link" @click="func(n)">{{ n }}</button>
        </li>
      </template>
      <li :class="number == count ? 'disabled' : ''" class="page-item">
        <button class="page-link" @click="func(number + 1)">Keyingi</button>
      </li>
    </ul>
    <form @submit.prevent>
      <input class="form-control" v-model="sizeModel" placeholder="Size" />
      <input class="form-control" v-model="dotModel" placeholder="Dots Index" />
      <button class="btn btn-primary" @click="paginat">Submit</button>
    </form>
    <h3 class="text-muted float-end me-4">
      {{ "    Total cars:  " + this.total }}
    </h3>
  </nav>
</template>

<script>
export default {
  props: {
    Pagination: Object,
  },
  data() {
    return {
      number: 6,
      count: 1,
      total: 10,
      size: 8,
      dotIn: 2,
      dotModel: 2,
      sizeModel: 8,
    };
  },
  mounted() {
    this.number = this.Pagination.PageNumber;
    this.count = this.Pagination.PageCount;
    this.total = this.Pagination.TotalCount;
  },
  watch: {
    Pagination(val) {
      this.number = val.PageNumber;
      this.count = val.PageCount;
      this.total = val.TotalCount;
    },
  },
  methods: {
    func(num) {
      this.number = num;
      this.$emit("paging", num, 10);
    },
    paginat() {
      this.size = this.sizeModel;
      this.dotIn = this.dotModel;
    },
  },
};
</script>

<style scoped></style>
