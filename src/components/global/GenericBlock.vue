<template>
  <div class="card w-96 bg-base-300 shadow-xl">
    <figure>
      <img :src="props.img" alt="Shoes" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        {{ props.title }}
        <div
          v-for="(item, index) in tagsLoop"
          :key="index"
          class="badge badge-primary"
        >
          {{ item }}
        </div>
      </h2>
      <p>{{ props.description }}</p>
      <div class="card-actions justify-end">
        <a class="btn btn-primary" :href="props.link">Read More</a>
      </div>

    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "mariojgt is heredude",
  },
  description: {
    type: String,
    default: "infor here",
  },
  link: {
    type: String,
    default: "https://tailwindcss.com/docs/grid-template-columns",
  },
  img: {
    type: String,
    default:
      "https://raw.githubusercontent.com/mariojgt/skeleton/master/Publish/Art/skeleton.png",
  },
  tags: {
    type: String,
    default: "php,laravel",
  },
});

let tagsLoop = $ref();

const projectTags = async () => {
  // Build the tags spereate by comma
  tagsLoop = props.tags.split(",");
};

projectTags();
</script>
