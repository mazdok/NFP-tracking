<template>
  <el-card shadow="never">
    <h1>NFP <small>(Natural Family Planning)</small> Tracking App</h1>
    <p>
      A small project that aims to facilitate the process of research on its
      fertility by the Craigon method (mainly).
    </p>

    <el-alert
      class="my-4"
      type="warning"
      description="Keep in mind that the project is in development and may contain various
        errors."
      :closable="false"
    >
    </el-alert>

    <p class="font-bold">You can help the project by:</p>
    <ul>
      <li>notifying the detected error</li>
      <li>write your wishes for product improvement</li>
      <li>any other help is welcome</li>
    </ul>

    <el-divider></el-divider>

    <address>
      <p>
        Reach me at:
        <a href="mailto:grydzhukpavlo@gmail.com">grydzhukpavlo@gmail.com</a>
      </p>
    </address>
  </el-card>
</template>

<script>
export default {
  computed: {},
};
</script>