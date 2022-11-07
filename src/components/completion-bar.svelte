<script lang="ts">
  export let completion: number;
</script>

<div class="bar">
  <div class="completed" style="width: {completion*100}%"></div>
</div>

<style lang="scss">
  .bar {
    width: 100%;
    height: 1rem;
    box-shadow: rgba(0, 0, 0, 0.197) 0px 0px 0px 2px;
    border-radius: 1rem;


    .completed {
      height: 100%;
      background-color: #00b894;
      border-radius: 1rem;
      transition: width 0.5s ease;
    }
  }
</style>